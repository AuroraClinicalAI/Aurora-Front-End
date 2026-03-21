import { DefaultLayout } from "@/layout/DefaultLayout";
import { ActivityMetricsGrid } from "@/components/feature/profile/ActivityMetricsGrid";
import { ActivityFilters } from "@/components/feature/profile/ActivityFilters";
import { ProfileActivityList } from "@/components/feature/profile/ProfileActivityList";
import { ActivityPagination } from "@/components/feature/profile/ActivityPagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const RecentActivity = () => {
  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-3xl font-bold text-zinc-900">Actividad Reciente</h1>
            <p className="text-slate-500 text-sm font-medium">
              Resumen de tu impacto en la plataforma desde tu incorporación.
            </p>
          </div>

          <ActivityMetricsGrid />

          <ActivityFilters />

          <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden mt-8 p-8">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold text-zinc-900">Historial Completo</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Reusing ProfileActivityList style but without its internal card wrapper logic for better layout control here */}
              <ProfileActivityList />
              <ActivityPagination />
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
