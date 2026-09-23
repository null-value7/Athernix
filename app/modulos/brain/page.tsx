// @ts-nocheck
import ModuleExperience from '@/components/ui/ModuleExperience';

export const metadata = {
  title: 'MenteLibre VR',
  description: 'Modulo de salud mental VR con biofeedback adaptativo.',
};

export default function MenteLibrePage() {
  return <ModuleExperience moduleKey="mind" />;
}
