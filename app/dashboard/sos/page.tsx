import SOSButton from "@/components/dashboard/SOSButton";

export default function SOSPage() {
    return (
        <div className="space-y-6">
            <header className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Emergency SOS</h1>
                <p className="text-slate-400">
                    Press the button below to instantly alert security and your emergency contacts.
                    Your live location will be shared immediately.
                </p>
            </header>

            <SOSButton />
        </div>
    );
}
