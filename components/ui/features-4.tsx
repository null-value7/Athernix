// @ts-nocheck
import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export default function Features4() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500">
                        La base para la gestión de equipos creativos
                    </h2>
                    <p className="text-neutral-300">
                        Athernix está evolucionando para ser más que solo modelos. Soporta una plataforma completa de APIs y herramientas ayudando a desarrolladores y empresas a innovar.
                    </p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border border-orange-500/20 *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-orange-500" />
                            <h3 className="text-sm font-medium text-white">Rápido</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma completa ayudando a desarrolladores a innovar.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4 text-pink-500" />
                            <h3 className="text-sm font-medium text-white">Potente</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma completa ayudando a desarrolladores y empresas.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4 text-orange-500" />

                            <h3 className="text-sm font-medium text-white">Seguridad</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma ayudando a desarrolladores y empresas.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4 text-pink-500" />

                            <h3 className="text-sm font-medium text-white">Personalización</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma ayudando a desarrolladores y empresas a innovar.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4 text-orange-500" />

                            <h3 className="text-sm font-medium text-white">Control</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma ayudando a desarrolladores y empresas a innovar.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-pink-500" />

                            <h3 className="text-sm font-medium text-white">Construido para IA</h3>
                        </div>
                        <p className="text-sm text-neutral-400">Soporta una plataforma ayudando a desarrolladores y empresas a innovar.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
