import { LOCATIONS } from '../../models/location.model';
import ExperienceClient from './ExperienceClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ id: l.experienceUrl.split('/').pop() as string }));
}

export default function ExperiencePage() {
  return <ExperienceClient />;
}
