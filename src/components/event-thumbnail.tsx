import hero from '@/assets/hero.jpg';
import garba from '@/assets/garba.jpg';
import football from '@/assets/football.jpg';
import coding from '@/assets/coding.jpg';
import dance from '@/assets/dance.jpg';
const images: Record<string, string> = { hero, garba, football, coding, dance };
export function EventThumbnail({ image, className = '' }: { image: string; className?: string }) { return images[image] ? <img src={images[image]} alt="" className={`object-cover ${className}`} /> : <div className={`bg-gradient-to-br from-accent via-primary to-cyan ${className}`} />; }
