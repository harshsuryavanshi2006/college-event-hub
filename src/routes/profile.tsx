import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight, Bell, Search, Calendar, MapPin, Zap, Star, Sparkles, Heart,
  CalendarDays, Award, Flame, Target, Clock, Trophy, Medal, Download,
  User, Home, LogOut, Camera, Compass, Users, Settings, Smile, Crown,
  Instagram, Youtube, Twitter, Linkedin, Hexagon,
} from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import cover from "@/assets/cover.jpg";
import garba from "@/assets/garba.jpg";
import hero from "@/assets/hero.jpg";
import dance from "@/assets/dance.jpg";
import bands from "@/assets/bands.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Spark — My Profile" },
      { name: "description", content: "Your Spark dashboard: events, clubs, certificates and progress." },
      { property: "og:title", content: "Spark — My Profile" },
      { property: "og:description", content: "Your Spark dashboard: events, clubs, certificates and progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const stats = [
  { icon: CalendarDays, n: "5", label: "Events Attended", sub: "Keep going!", c: "bg-accent" },
  { icon: Users, n: "2", label: "Clubs Joined", sub: "Explore more!", c: "bg-cyan" },
  { icon: Award, n: "3", label: "Certificates Earned", sub: "Well done!", c: "bg-primary text-primary-foreground" },
  { icon: Flame, n: "12", label: "Day Streak", sub: "You're on fire!", c: "bg-accent" },
];
const myUpcoming = [
  { title: "Freshers Garba Session", tag: "Dance", date: "12 Oct 2025", time: "5:00 PM – 8:30 PM", place: "College Ground", img: garba },
  { title: "Open Mic Night", tag: "Creative", date: "16 Oct 2025", time: "6:00 PM – 9:00 PM", place: "Library Hall", img: hero },
  { title: "Creative Challenge", tag: "Design", date: "20 Oct 2025", time: "10:00 AM – 1:00 PM", place: "Design Studio", img: null },
];
const activity = [
  { title: "Freshers Garba Session", sub: "Registered · 12 Oct 2025", status: "Upcoming", img: garba },
  { title: "Open Mic Night", sub: "Attended · 16 Sep 2025", status: "Completed", img: hero },
  { title: "Poster Making Contest", sub: "Participated · 5 Sep 2025", status: "Completed", img: null },
  { title: "Creative Challenge", sub: "Registered · 20 Oct 2025", status: "Upcoming", img: null },
  { title: "Dance Workshop", sub: "Attended · 28 Aug 2025", status: "Completed", img: dance },
];
const badges = [
  { name: "Communication", sub: "Stronger together", c: "text-accent" },
  { name: "Creativity", sub: "Ideas into action", c: "text-primary" },
  { name: "Teamwork", sub: "Better together", c: "text-cyan" },
  { name: "Leadership", sub: "Lead with purpose", c: "text-accent" },
];
const certs = [
  { title: "Participation Certificate", event: "Freshers Garba Session", date: "12 Oct 2025", img: garba },
  { title: "Certificate of Participation", event: "Open Mic Night", date: "16 Sep 2025", img: hero },
  { title: "Participation Certificate", event: "Poster Making Contest", date: "5 Sep 2025", img: bands },
];
const quickLinks = [
  { icon: Compass, title: "Explore Opportunities", sub: "Find your next big thing" },
  { icon: Users, title: "Browse Clubs", sub: "Meet like-minded people" },
  { icon: Calendar, title: "View Calendar", sub: "Never miss an event" },
  { icon: Settings, title: "Update Profile", sub: "Keep your info current" },
];
const sideMenu = [
  { icon: User, label: "Profile", active: true },
  { icon: Heart, label: "Interests" },
  { icon: CalendarDays, label: "My Events" },
  { icon: Calendar, label: "Digital Calendar" },
  { icon: Home, label: "Back to Home", to: "/" },
  { icon: Star, label: "Upcoming Events", to: "/events" },
  { icon: Trophy, label: "My Scores" },
];

const yellowBtn = "inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold transition hover:scale-105 hover:shadow-lg";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`reveal rounded-2xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>;
}

function CardHead({ icon: I, title, sub, action = "View All" }: { icon: typeof Star; title: string; sub?: string; action?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h3 className="font-hand text-2xl text-secondary flex items-center gap-2"><I className="size-5 text-accent" /> {title}</h3>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
      <button className="rounded-full border px-3 py-1 text-xs font-medium flex items-center gap-1 hover:shadow transition shrink-0">{action} <ArrowRight className="size-3" /></button>
    </div>
  );
}

function ProfilePage() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="font-sans flex">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b">
          <div className="flex items-center justify-between px-6 h-16 gap-4">
            <p className="font-hand text-2xl text-secondary flex items-center gap-2 whitespace-nowrap"><Zap className="size-5 text-primary fill-primary" />Spark <span className="hidden sm:inline text-sm font-sans text-muted-foreground">More Than Just Classes</span> <Crown className="size-4 text-primary" /></p>
            <div className="hidden md:flex items-center gap-2 rounded-full border bg-card px-4 py-2 flex-1 max-w-md">
              <Search className="size-4 text-muted-foreground" />
              <input placeholder="Search events, clubs, opportunities..." className="bg-transparent flex-1 text-sm outline-none min-w-0" />
            </div>
            <Bell className="size-5 text-primary fill-primary shrink-0" />
          </div>
        </header>

        <main className="px-6 py-8 space-y-6 max-w-5xl mx-auto">
          {/* Profile header */}
          <div className="reveal relative rounded-3xl overflow-hidden border shadow-sm">
            <img src={cover} alt="Campus cover" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
            <p className="absolute top-4 right-6 font-hand text-2xl text-secondary rotate-[-4deg] hidden md:block">Same Campus<br />Different Stories</p>
            <div className="relative p-6 flex items-center gap-5">
              <div className="relative shrink-0">
                <img src={avatar} alt="Harsh Suryavanshi" className="size-24 rounded-full object-cover border-4 border-card shadow-lg" />
                <button className="absolute bottom-0 right-0 size-7 rounded-full bg-secondary text-secondary-foreground grid place-items-center shadow"><Camera className="size-3.5" /></button>
              </div>
              <div>
                <p className="font-hand text-3xl text-secondary">Hey, Harsh! <span className="text-primary">☀</span></p>
                <h1 className="text-xl font-bold">Harsh Suryavanshi</h1>
                <p className="text-sm text-muted-foreground">2nd Year · Computer Engineering</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3.5" /> PIT Hinjewadi, Pune</p>
                <p className="font-hand text-lg text-accent mt-1">"Better days are coming, keep going!" <Smile className="inline size-4 text-primary" /></p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ icon: I, ...s }) => (
              <Card key={s.label} className="relative">
                <Star className="absolute top-3 right-3 size-4 text-primary animate-twinkle" />
                <div className={`size-10 rounded-xl ${s.c} text-accent-foreground grid place-items-center mb-2`}><I className="size-5" /></div>
                <p className="text-2xl font-bold">{s.n}</p>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-accent">{s.sub}</p>
              </Card>
            ))}
          </div>

          {/* Progress */}
          <Card className="relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-accent text-accent-foreground grid place-items-center"><Target className="size-6" /></div>
              <div>
                <h3 className="font-hand text-2xl text-secondary">Your Progress</h3>
                <p className="text-xs text-muted-foreground">Complete more events and earn more badges!</p>
              </div>
              <p className="ml-auto font-hand text-xl text-accent rotate-[-4deg] hidden sm:block">You're doing amazing!</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-3 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-3/5 rounded-full bg-primary transition-all duration-1000" />
              </div>
              <p className="text-sm font-semibold whitespace-nowrap">6 / 10 events</p>
            </div>
          </Card>

          {/* Upcoming + Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHead icon={CalendarDays} title="Upcoming Events" />
              <div className="space-y-4">
                {myUpcoming.map((e) => (
                  <div key={e.title} className="flex items-center gap-3 group">
                    <div className="size-14 rounded-xl overflow-hidden shrink-0">
                      {e.img ? <img src={e.img} alt="" loading="lazy" className="size-full object-cover group-hover:scale-110 transition duration-500" /> : <div className="size-full bg-gradient-to-br from-accent via-primary to-cyan" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold flex items-center gap-2">{e.title} <span className="rounded-full bg-accent/15 text-accent text-[10px] px-2 py-0.5">{e.tag}</span></p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="size-3" />{e.date} | {e.time}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{e.place}</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition shrink-0" />
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHead icon={Clock} title="Recent Activity" />
              <div className="space-y-4">
                {activity.map((a) => (
                  <div key={a.title} className="flex items-center gap-3">
                    <div className="size-10 rounded-lg overflow-hidden shrink-0">
                      {a.img ? <img src={a.img} alt="" loading="lazy" className="size-full object-cover" /> : <div className="size-full bg-gradient-to-br from-accent via-primary to-cyan" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.sub}</p>
                    </div>
                    <span className={`rounded-full text-[10px] px-2.5 py-1 font-medium shrink-0 ${a.status === "Upcoming" ? "bg-primary/40" : "bg-cyan/25"}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Performance */}
          <Card>
            <CardHead icon={Trophy} title="My Performance" sub="Your skills, certificates and achievements." action="View Details" />
            <div className="grid sm:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="relative size-32">
                  <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-muted)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-cyan)" strokeWidth="10" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="66" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div><p className="text-2xl font-bold">75%</p><p className="text-[10px] text-muted-foreground">Overall Growth</p></div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3">Skills & Badges</p>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((b) => (
                    <div key={b.name} className="flex items-center gap-2">
                      <Hexagon className={`size-8 ${b.c} fill-current/10`} />
                      <div><p className="text-xs font-semibold">{b.name}</p><p className="text-[10px] text-muted-foreground">{b.sub}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">Your Journey <Sparkles className="size-4 text-primary animate-twinkle" /></p>
                <div className="space-y-2 border-l-2 border-muted pl-4">
                  {["Joined 4 Clubs", "Attended 5 Events", "Earned 3 Certificates"].map((j, i) => (
                    <p key={j} className="text-xs text-muted-foreground relative">
                      <span className={`absolute -left-[21px] top-1 size-2.5 rounded-full ${["bg-accent", "bg-cyan", "bg-primary"][i]}`} />{j}
                    </p>
                  ))}
                  <p className="text-xs text-accent font-medium">On your way to more!</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Certificates + Quick links */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHead icon={Medal} title="My Certificates" />
              <div className="grid grid-cols-3 gap-3">
                {certs.map((c) => (
                  <div key={c.event} className="space-y-1.5">
                    <div className="h-16 rounded-lg overflow-hidden"><img src={c.img} alt="" loading="lazy" className="size-full object-cover hover:scale-110 transition duration-500" /></div>
                    <p className="text-[11px] font-semibold leading-tight">{c.title}</p>
                    <p className="text-[10px] text-muted-foreground">{c.event}</p>
                    <p className="text-[10px] text-muted-foreground">{c.date}</p>
                    <button className="w-full rounded-full border py-1 text-[11px] font-medium flex items-center justify-center gap-1 hover:bg-muted transition"><Download className="size-3" /> Download</button>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHead icon={Zap} title="Quick Links" action="" />
              <div className="space-y-2">
                {quickLinks.map(({ icon: I, ...q }) => (
                  <button key={q.title} className="w-full flex items-center gap-3 rounded-xl border p-3 hover:shadow-md hover:-translate-y-0.5 transition text-left">
                    <div className="size-9 rounded-lg bg-accent text-accent-foreground grid place-items-center shrink-0"><I className="size-4" /></div>
                    <div className="flex-1"><p className="text-sm font-semibold">{q.title}</p><p className="text-xs text-muted-foreground">{q.sub}</p></div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Banner */}
          <div className="reveal relative rounded-3xl overflow-hidden">
            <img src={cover} alt="Campus at sunset" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-secondary/40" />
            <div className="relative p-8 flex items-center justify-between gap-4 text-secondary-foreground">
              <p className="font-hand text-3xl rotate-[-2deg]">Every experience<br />shapes a better you</p>
              <p className="font-hand text-2xl text-primary rotate-[3deg]">Keep exploring Harsh!</p>
            </div>
          </div>
        </main>

        <footer className="border-t">
          <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
            <div><p className="font-hand text-2xl flex items-center text-secondary"><Zap className="size-5 text-primary fill-primary" />Spark</p><p className="text-sm text-muted-foreground mt-2">Discover. Participate. Grow.<br />Your campus, your stage.</p></div>
            <div><p className="font-semibold text-sm mb-3">Follow Us</p><div className="flex gap-3">{[Instagram, Youtube, Twitter, Linkedin].map((I, i) => <a key={i} href="#" className="size-9 rounded-lg border grid place-items-center hover:bg-primary transition"><I className="size-4" /></a>)}</div></div>
            <div><p className="font-semibold text-sm">Stay Updated</p><p className="text-xs text-muted-foreground mb-3">Get the latest events, clubs and opportunities.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex rounded-full border p-1"><input placeholder="Your email address" className="bg-transparent flex-1 px-3 text-sm outline-none min-w-0" /><button className={`${yellowBtn} px-4 py-1.5 text-sm`}>Subscribe</button></form></div>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-4 border-t text-xs text-muted-foreground flex justify-between"><span>© 2025 Spark. All rights reserved.</span><span>Privacy | Terms | Contact</span></div>
        </footer>
      </div>

      {/* Right sidebar */}
      <aside className="w-60 shrink-0 bg-secondary text-secondary-foreground min-h-screen sticky top-0 h-screen hidden lg:flex flex-col p-5 relative overflow-hidden">
        <div className="flex flex-col items-center text-center mt-2">
          <div className="relative">
            <img src={avatar} alt="Harsh Suryavanshi" className="size-20 rounded-full object-cover border-2 border-primary shadow-lg" />
            <span className="absolute bottom-1 right-1 size-4 rounded-full bg-cyan border-2 border-secondary" />
          </div>
          <p className="font-semibold mt-3">Harsh Suryavanshi</p>
          <p className="text-xs opacity-70">2nd Year · CSE</p>
          <p className="text-xs mt-1 flex items-center gap-1.5"><span className="size-2 rounded-full bg-cyan inline-block" /> Online</p>
        </div>
        <nav className="mt-8 space-y-1 flex-1">
          {sideMenu.map(({ icon: I, ...m }) => (
            m.to ? (
              <Link key={m.label} to={m.to} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm opacity-80 hover:opacity-100 hover:bg-secondary-foreground/10 transition">
                <I className="size-4" /> {m.label}
              </Link>
            ) : (
              <button key={m.label} className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${m.active ? "bg-primary text-primary-foreground font-semibold" : "opacity-80 hover:opacity-100 hover:bg-secondary-foreground/10"}`}>
                <I className="size-4" /> {m.label}
              </button>
            )
          ))}
        </nav>
        <button className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm opacity-80 hover:opacity-100 hover:bg-secondary-foreground/10 transition border-t border-secondary-foreground/10 pt-4">
          <LogOut className="size-4" /> Log Out
        </button>
        <p className="font-hand text-2xl text-primary rotate-[-6deg] text-center mt-6">Small steps make big dreams</p>
        <Smile className="size-6 text-primary mx-auto mt-2 animate-float" />
        <Sparkles className="absolute top-1/3 right-4 size-5 text-primary animate-twinkle" />
      </aside>
    </div>
  );
}
