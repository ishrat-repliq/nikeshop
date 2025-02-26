import { useState } from "react"
import { CreditCard, Trash2 } from "lucide-react"



export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", type: "Credit Card", lastFour: "4242", expirationDate: "12/2024" },
    { id: "2", type: "PayPal", lastFour: "1234" },
  ])

  const handleDelete = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    // Here you would typically send a delete request to your backend
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-gray-600" />
              <div>
                <p className="font-semibold">{method.type}</p>
                <p className="text-sm text-gray-600">
                  {method.type === "Credit Card"
                    ? `**** **** **** ${method.lastFour}`
                    : `PayPal account ending in ${method.lastFour}`}
                </p>
                {method.expirationDate && <p className="text-sm text-gray-600">Expires: {method.expirationDate}</p>}
              </div>
            </div>
            <button onClick={() => handleDelete(method.id)} className="text-red-600 hover:text-red-800">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add New Payment Method</button>
      </div>
    </div>
  )
}

