import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListOrders, useUpdateOrderStatus } from "@workspace/api-client-react";
import { useAuthHeaders } from "@/store/use-auth";
import { format } from "date-fns";

export default function Orders() {
  const authHeaders = useAuthHeaders();
  const { data: orders, isLoading, refetch } = useListOrders({ request: authHeaders });
  const updateStatus = useUpdateOrderStatus({ request: authHeaders });

  const handleStatusChange = (id: number, status: any) => {
    updateStatus.mutate({ id, data: { status } }, {
      onSuccess: () => refetch()
    });
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Orders</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/50 text-primary font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders?.map(order => (
                <tr key={order.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-bold">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div>{order.customerName}</div>
                    <div className="text-muted-foreground text-xs">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold">KES {order.totalAmount}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className="border border-border rounded-lg px-2 py-1 text-sm bg-background"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={updateStatus.isPending}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!orders?.length && (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
