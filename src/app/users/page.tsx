'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import UserList from '@/components/users/UserList'
import InviteUserForm from '@/components/users/InviteUserForm'

export default function Users() {
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage user access and permissions
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Invite User
          </button>
        </div>

        <UserList />

        {showInviteModal && (
          <InviteUserForm
            onClose={() => setShowInviteModal(false)}
            onSuccess={() => {
              setShowInviteModal(false)
              // The UserList component will automatically refresh
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
