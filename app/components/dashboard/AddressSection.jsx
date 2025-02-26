import { useState } from "react"



export default function AddressSection() {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "Billing",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    {
      id: "2",
      type: "Shipping",
      street: "456 Elm St",
      city: "Other City",
      state: "NY",
      zipCode: "67890",
      country: "USA",
    },
  ])

  const [editingId, setEditingId] = useState(null)
  const [newAddress, setNewAddress] = useState({
    type: "Shipping",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = (id) => {
    setEditingId(null)
    // Here you would typically send the updated address to your backend
  }

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id))
    // Here you would typically send a delete request to your backend
  }

  const handleAddNew = () => {
    const id = Math.random().toString(36).substr(2, 9)
    setAddresses([...addresses, { id, ...newAddress }])
    setNewAddress({
      type: "Shipping",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    })
    // Here you would typically send the new address to your backend
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Addresses</h2>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-gray-50 rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{address.type} Address</h3>
              <div className="space-x-2">
                {editingId === address.id ? (
                  <button onClick={() => handleSave(address.id)} className="text-blue-600 hover:text-blue-800">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(address.id)} className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(address.id)} className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
            {editingId === address.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddresses(addresses.map((a) => (a.id === address.id ? { ...a, street: e.target.value } : a)))
                  }
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddresses(addresses.map((a) => (a.id === address.id ? { ...a, city: e.target.value } : a)))
                  }
                  className="w-full border rounded px-2 py-1"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      setAddresses(addresses.map((a) => (a.id === address.id ? { ...a, state: e.target.value } : a)))
                    }
                    className="w-1/2 border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddresses(addresses.map((a) => (a.id === address.id ? { ...a, zipCode: e.target.value } : a)))
                    }
                    className="w-1/2 border rounded px-2 py-1"
                  />
                </div>
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddresses(addresses.map((a) => (a.id === address.id ? { ...a, country: e.target.value } : a)))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ) : (
              <div>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
        <div className="space-y-2">
          <select
            value={newAddress.type}
            onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Billing">Billing</option>
            <option value="Shipping">Shipping</option>
          </select>
          <input
            type="text"
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="w-1/2 border rounded px-2 py-1"
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={newAddress.zipCode}
              onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
              className="w-1/2 border rounded px-2 py-1"
            />
          </div>
          <input
            type="text"
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
          <button onClick={handleAddNew} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Address
          </button>
        </div>
      </div>
    </div>
  )
}

