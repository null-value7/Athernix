import { LOCATIONS } from '../../models/location.model';

// Prerender estático: los IDs se conocen en build time, evita una edge function pesada.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ id: l.experienceUrl.split('/').pop() as string }));
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
