import ModuleDetailView from '@/components/modules/ModuleDetailView';

export const metadata = {
  title: 'Historia Viva VR',
  description: 'Modulo cultural de Athernix para educacion historica inmersiva.',
};

export default function HistoriaVivaPage() {
  return <ModuleDetailView moduleKey="history" />;
}
