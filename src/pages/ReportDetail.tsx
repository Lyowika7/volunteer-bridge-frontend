import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { reportsAPI } from "@/services/api";
import { ArrowLeft, FileText } from "lucide-react";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await reportsAPI.getOne(id);
        setReport(res.data?.data || null);
      } catch (err) {
        console.error("Failed to load report:", err);
        setError("Failed to load report details.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <ErrorMessage message={error} />
        </div>
      </MainLayout>
    );
  }

  if (!report) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <ErrorMessage message="Report not found." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link
          to="/reports"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-start gap-3 mb-4">
            <FileText className="h-6 w-6 text-primary mt-1" />
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {report.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground mb-6">
            {report.project?.name && <p><strong>Project:</strong> {report.project.name}</p>}
            {report.reportsOwner?.name && <p><strong>Submitted by:</strong> {report.reportsOwner.name}</p>}
            {report.reportsOwner?.email && <p><strong>Email:</strong> {report.reportsOwner.email}</p>}
            {report.status && <p><strong>Status:</strong> {report.status}</p>}
          </div>

          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">
              Report Content
            </h2>
            <div className="glass-card p-5">
              <p className="text-muted-foreground whitespace-pre-line">
                {report.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportDetail;