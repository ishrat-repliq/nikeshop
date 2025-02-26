import { useState } from "react"



export default function OrderHistory() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2023-05-15",
      total: 129.99,
      status: "Delivered",
      items: [
        { name: "Product A", quantity: 2, price: 49.99 },
        { name: "Product B", quantity: 1, price: 30.01 },
      ],
    },
    {
      id: "ORD-002",
      date: "2023-06-01",
      total: 79.99,
      status: "Shipped",
      items: [{ name: "Product C", quantity: 1, price: 79.99 }],
    },
    {
      id: "ORD-003",
      date: "2023-06-10",
      total: 199.97,
      status: "Processing",
      items: [{ name: "Product D", quantity: 3, price: 66.66 }],
    },
  ])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.name} - Qty: {item.quantity} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

