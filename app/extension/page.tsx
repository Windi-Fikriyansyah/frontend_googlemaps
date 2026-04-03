import { Puzzle, Download, CheckCircle, ArrowRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function ExtensionPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <Puzzle className="w-3.5 h-3.5" />
                        Akses Ekstensi Chrome
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Wamaps <span className="text-blue-600">Extension</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Gunakan ekstensi ini untuk keperluan sinkronasi dan mempermudah akses alat langsung dari browser Chrome Anda. Unduh versi ZIP terbaru di bawah ini.
                    </p>
                </div>
            </div>

            {/* Download Card Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/25 flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Chrome className="w-48 h-48" />
                    </div>

                    <div className="z-10 mb-8">
                        <h2 className="text-2xl font-black mb-2">Download Extension</h2>
                        <p className="text-blue-100 mb-6">
                            File berformat .zip. Anda perlu melakukan proses "Load unpacked" pada opsi pengembang di Google Chrome.
                        </p>

                        <div className="space-y-3">
                            {['Terintegrasi Penuh', 'Data Real-time', 'Sangat Ringan'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-blue-50">
                                    <CheckCircle className="w-5 h-5 text-blue-300" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="z-10 mt-auto">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 rounded-2xl h-14 px-8 font-black shadow-xl"
                        >
                            <a href="/extensions/scrapemaps.zip" download="extension-wamaps.zip">
                                <Download className="w-5 h-5 mr-2 -ml-1" />
                                Download extension-wamaps.zip
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Installation Guide */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        Cara Install Ekstensi <ArrowRight className="w-5 h-5 text-slate-400" />
                    </h3>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Ekstrak File ZIP</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Setelah berhasil didownload, ekstrak file <b>extension-wamaps.zip</b> ke sebuah folder di komputer Anda.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Buka Ekstensi Chrome</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Buka Google Chrome, ketikkan <b>chrome://extensions/</b> di URL address bar, lalu tekan Enter.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Aktifkan Developer Mode</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Di pojok kanan atas layar ekstensi, pastikan tombol <b>Developer mode</b> (Mode Pengembang) aktif.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shrink-0">4</div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Load Unpacked</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Klik tombol <b>Load unpacked</b> (Muat yang belum dibongkar) di kiri atas, dan pilih folder tempat Anda mengekstrak file ZIP tadi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
