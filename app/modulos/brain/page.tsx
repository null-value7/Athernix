import ModuleDetailView from '@/components/modules/ModuleDetailView';

export const metadata = {
  title: 'MenteLibre VR',
  description: 'Modulo de salud mental VR con biofeedback adaptativo.',
};

export default function MenteLibrePage() {
  return <ModuleDetailView moduleKey="mind" />;
}
