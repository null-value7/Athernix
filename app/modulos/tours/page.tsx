import ModuleDetailView from '@/components/modules/ModuleDetailView';

export const metadata = {
  title: 'SVirtual Tours',
  description: 'Modulo turistico de Athernix para recorridos digitales guiados por IA.',
};

export default function SVirtualToursPage() {
  return <ModuleDetailView moduleKey="tours" />;
}
