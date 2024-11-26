'use client'

import { useState, createContext, useContext } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  ChevronRightIcon, 
  DocumentTextIcon, 
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface Framework {
  id: string
  name: string
  version: string
  description: string
  created_at: string
}

interface DeleteContextType {
  isDeleting: boolean
  setIsDeleting: (value: boolean) => void
  frameworkToDelete: Framework | null
  setFrameworkToDelete: (framework: Framework | null) => void
}

const DeleteContext = createContext<DeleteContextType | null>(null)

function useDeleteContext() {
  const context = useContext(DeleteContext)
  if (!context) {
    throw new Error('useDeleteContext must be used within a DeleteContextProvider')
  }
  return context
}

interface FrameworkItemProps {
  framework: Framework
}

// Mock data for the status indicators - replace with real data later
const getFrameworkStatus = (frameworkId: string) => {
  const statuses = {
    controls: Math.floor(Math.random() * 100),
    completed: Math.floor(Math.random() * 100),
    issues: Math.floor(Math.random() * 10),
  }
  return statuses
}

function FrameworkStatusIndicators({ frameworkId }: { frameworkId: string }) {
  const status = getFrameworkStatus(frameworkId)
  
  return (
    <div className="flex items-center space-x-6 text-sm">
      <div className="flex items-center text-gray-500">
        <DocumentTextIcon className="h-5 w-5 mr-1.5" />
        <span>{status.controls} Controls</span>
      </div>
      <div className="flex items-center text-green-600">
        <CheckCircleIcon className="h-5 w-5 mr-1.5" />
        <span>{status.completed}% Complete</span>
      </div>
      <div className="flex items-center text-red-600">
        <ExclamationCircleIcon className="h-5 w-5 mr-1.5" />
        <span>{status.issues} Issues</span>
      </div>
    </div>
  )
}

function FrameworkItem({ framework }: FrameworkItemProps) {
  const router = useRouter()
  const { isDeleting, setFrameworkToDelete } = useDeleteContext()

  const handleClick = (e: React.MouseEvent) => {
    if (isDeleting) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    router.push(`/frameworks/${framework.id}`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFrameworkToDelete(framework)
  }

  return (
    <div 
      className={cn(
        "group relative bg-white hover:bg-gray-50 transition-colors duration-200",
        "border-b border-gray-200 last:border-b-0"
      )}
    >
      <div 
        onClick={handleClick}
        className="flex items-center px-6 py-6 cursor-pointer"
      >
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-center">
            <div className="flex items-center flex-1">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {framework.name}
                </h3>
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                  <span>Version {framework.version}</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Last updated {new Date(framework.created_at).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {framework.description}
                </p>
                <div className="mt-4">
                  <FrameworkStatusIndicators frameworkId={framework.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-6 flex items-center space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={cn(
              "p-2 rounded-full transition-colors duration-200",
              isDeleting 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
            )}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <ChevronRightIcon 
            className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" 
          />
        </div>
      </div>
    </div>
  )
}

function DeleteConfirmationDialog() {
  const { frameworkToDelete, setFrameworkToDelete, setIsDeleting } = useDeleteContext()
  const queryClient = useQueryClient()
  const supabase = createClientComponentClient()

  const deleteFramework = useMutation({
    mutationFn: async (frameworkId: string) => {
      setIsDeleting(true)
      try {
        // Delete all associated subcontrols first
        const { data: controls } = await supabase
          .from('controls')
          .select('id')
          .eq('framework_id', frameworkId)

        if (controls && controls.length > 0) {
          const controlIds = controls.map(c => c.id)
          
          // Delete subcontrols
          const { error: subcontrolsError } = await supabase
            .from('subcontrols')
            .delete()
            .in('control_id', controlIds)

          if (subcontrolsError) throw subcontrolsError
        }

        // Delete controls
        const { error: controlsError } = await supabase
          .from('controls')
          .delete()
          .eq('framework_id', frameworkId)

        if (controlsError) throw controlsError

        // Finally, delete the framework
        const { error: frameworkError } = await supabase
          .from('frameworks')
          .delete()
          .eq('id', frameworkId)

        if (frameworkError) throw frameworkError

        return frameworkId
      } finally {
        setIsDeleting(false)
      }
    },
    onMutate: async (frameworkId) => {
      await queryClient.cancelQueries({ queryKey: ['frameworks'] })
      const previousFrameworks = queryClient.getQueryData(['frameworks'])
      queryClient.setQueryData(['frameworks'], (old: Framework[] = []) => {
        return old.filter(framework => framework.id !== frameworkId)
      })
      return { previousFrameworks }
    },
    onSuccess: async (deletedFrameworkId) => {
      await queryClient.invalidateQueries({ queryKey: ['frameworks'] })
      await queryClient.refetchQueries({ queryKey: ['frameworks'] })
      setFrameworkToDelete(null)
      alert('Framework deleted successfully')
    },
    onError: (error, _, context) => {
      if (context?.previousFrameworks) {
        queryClient.setQueryData(['frameworks'], context.previousFrameworks)
      }
      console.error('Error deleting framework:', error)
      alert('Failed to delete framework. Please try again.')
      setFrameworkToDelete(null)
    },
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFrameworkToDelete(null)
    }
  }

  const handleCancel = () => {
    setFrameworkToDelete(null)
  }

  const handleConfirm = () => {
    if (frameworkToDelete) {
      deleteFramework.mutate(frameworkToDelete.id)
    }
  }

  return (
    <AlertDialog open={!!frameworkToDelete} onOpenChange={handleOpenChange}>
      <AlertDialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Framework</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this framework? This action cannot be undone and will remove all associated controls and assessments.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Framework:</strong> {frameworkToDelete?.name}</p>
          <p><strong>Version:</strong> {frameworkToDelete?.version}</p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={deleteFramework.isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteFramework.isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            {deleteFramework.isLoading ? 'Deleting...' : 'Delete Framework'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function FrameworksHeader() {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="px-6 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Active Frameworks
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your compliance frameworks
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Framework
          </button>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search frameworks..."
            className="block w-full rounded-md border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default function FrameworkList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [frameworkToDelete, setFrameworkToDelete] = useState<Framework | null>(null)
  const supabase = createClientComponentClient()

  const { data: frameworks = [], isLoading } = useQuery({
    queryKey: ['frameworks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Framework[]
    },
  })

  const filteredFrameworks = frameworks?.filter((framework) =>
    framework.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em]" />
      </div>
    )
  }

  if (!frameworks?.length) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No frameworks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new compliance framework.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Framework
          </button>
        </div>
      </div>
    )
  }

  return (
    <DeleteContext.Provider value={{ isDeleting, setIsDeleting, frameworkToDelete, setFrameworkToDelete }}>
      <div>
        <FrameworksHeader />
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredFrameworks?.map((framework) => (
            <FrameworkItem
              key={framework.id}
              framework={framework}
            />
          ))}
        </div>

        <DeleteConfirmationDialog />
      </div>
    </DeleteContext.Provider>
  )
}
