import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListWholesaleInquiries } from "@workspace/api-client-react";
import { useAuthHeaders } from "@/store/use-auth";
import { format } from "date-fns";

export default function WholesaleInquiries() {
  const authHeaders = useAuthHeaders();
  const { data: inquiries, isLoading } = useListWholesaleInquiries({ request: authHeaders });

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Wholesale Inquiries</h1>
      </div>

      <div className="grid gap-6">
        {inquiries?.map(inquiry => (
          <div key={inquiry.id} className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-primary">{inquiry.businessName}</h3>
                <p className="text-muted-foreground text-sm">Contact: {inquiry.contactName} | {inquiry.phone} | {inquiry.email}</p>
              </div>
              <span className="bg-secondary px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                {inquiry.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mt-4 p-4 bg-muted/30 rounded-xl">
              <div><span className="font-semibold">Location:</span> {inquiry.location || 'N/A'}</div>
              <div><span className="font-semibold">Volume:</span> {inquiry.estimatedVolume || 'N/A'}</div>
              <div className="col-span-2"><span className="font-semibold">Products:</span> {inquiry.productsInterested || 'N/A'}</div>
            </div>

            {inquiry.message && (
              <div className="mt-4">
                <span className="text-sm font-semibold">Message:</span>
                <p className="text-muted-foreground mt-1 text-sm bg-background p-4 rounded-xl border">{inquiry.message}</p>
              </div>
            )}
            
            <div className="mt-4 text-xs text-muted-foreground text-right">
              Received: {format(new Date(inquiry.createdAt), "PPpp")}
            </div>
          </div>
        ))}
        {!inquiries?.length && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border">
            No inquiries received yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
