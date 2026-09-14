export function ProofFooter() {
  const registryAddress = "0x3581079c6318a8119A2F4e765a1e452E51553B94";
  const receiptHash = "0x45a458fe127d5905cee6b9924f40e32aa1bfbb76000b96bbfbbbbb9f9f54e191";

  return (
    <footer className="border-t border-white/10 bg-[#003626] px-6 py-5 text-white">
      <div className="mx-auto grid max-w-6xl gap-3 text-xs">
        <strong className="uppercase tracking-[0.16em] text-[#15DCAC]">Proof on BOT Mainnet</strong>
        <div className="grid gap-3 text-[11px] text-white/60 md:grid-cols-[auto_1fr_1fr]">
          <div><span className="block uppercase tracking-wider text-white/35">Chain ID</span><b className="text-white">677</b></div>
          <div className="min-w-0"><span className="block uppercase tracking-wider text-white/35">Registry Address</span><code className="block truncate text-white/80">{registryAddress}</code></div>
          <div className="min-w-0"><span className="block uppercase tracking-wider text-white/35">Latest Receipt</span><code className="block truncate text-white/80">{receiptHash}</code></div>
        </div>
        <a className="text-[#A4EF6B]" href={`https://scan.botchain.ai/tx/${receiptHash}`} target="_blank" rel="noreferrer">View transaction on BOTScan ↗</a>
      </div>
    </footer>
  );
}
