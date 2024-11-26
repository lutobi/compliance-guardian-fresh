'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BuildingOffice2Icon } from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import AddOrganizationForm from '@/components/organizations/AddOrganizationForm'
import { Organization } from '@/types/database.types'

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const supabase = createClientComponentClient()

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('name')

      if (error) throw error
      setOrganizations(data || [])
    } catch (error) {
      console.error('Error fetching organizations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [supabase])

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchOrganizations()
    } catch (error) {
      console.error('Error deleting organization:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Organizations</h1>
            <p className="text-text-secondary mt-1">
              Manage your organizations and their compliance programs
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            Add Organization
          </button>
        </div>

        {/* Organizations Table */}
        <div className="card">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : organizations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 font-medium text-text-secondary">
                      Name
                    </th>
                    <th className="text-left py-4 font-medium text-text-secondary">
                      Description
                    </th>
                    <th className="text-left py-4 font-medium text-text-secondary">
                      Created At
                    </th>
                    <th className="text-right py-4 font-medium text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {organizations.map((org) => (
                    <tr key={org.id} className="group hover:bg-surface-light transition-colors">
                      <td className="py-4 font-medium">
                        {org.name}
                      </td>
                      <td className="py-4 text-text-secondary">
                        {org.description}
                      </td>
                      <td className="py-4 text-text-secondary">
                        {new Date(org.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right space-x-4">
                        <button 
                          className="text-primary hover:text-primary-light transition-colors"
                          onClick={() => console.log('Edit', org.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-secondary hover:opacity-80 transition-colors"
                          onClick={() => handleDelete(org.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-lg bg-surface-light flex items-center justify-center mx-auto">
                <BuildingOffice2Icon className="w-8 h-8 text-text-secondary" />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                No organizations
              </h3>
              <p className="mt-2 text-text-secondary">
                Get started by creating a new organization.
              </p>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary mt-6"
              >
                Add Organization
              </button>
            </div>
          )}
        </div>
      </div>

      <AddOrganizationForm
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchOrganizations}
      />
    </DashboardLayout>
  )
}
