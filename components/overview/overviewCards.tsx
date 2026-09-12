import type { OverviewContent } from '../../content/overview';

export const createOverviewCards = (t: OverviewContent) => {
  return [
    {
      id: 'academic',
      title: t.academic,
      code: '01',
      content: (
        <>
           <div className="text-lg font-bold mb-1">{t.phdCandidate}</div>
           <div className="text-retro-dim mb-4">{t.techInstitute}</div>
           <div className="text-xs font-mono bg-retro-surface p-2 inline-block border border-retro-border">
              {t.expGrad}
           </div>
        </>
      ),
      details: (
        <div className="mt-6 pt-6 border-t border-dashed border-retro-border space-y-4">
          <p className="text-sm text-retro-dark/80 leading-relaxed">
              {t.thesisDescription}
          </p>
          <div className="grid grid-cols-2 gap-4 bg-retro-surface/30 p-4 border border-retro-border">
              <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">GPA</span>
                  <span className="font-bold text-retro-dark">3.6 / 4.0</span>
              </div>
              <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">{t.dept}</span>
                  <span className="font-bold text-retro-dark">{t.computerScience}</span>
              </div>
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: t.researchAreas,
      code: '02',
      content: (
         <ul className="space-y-2">
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.approximationAlgorithms}
            </li>
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.graphTheory}
            </li>
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.distributedConsensus}
            </li>
         </ul>
      ),
      details: (
        <div className="mt-6 pt-6 border-t border-dashed border-retro-border space-y-4">
          <p className="text-sm text-retro-dark/80 leading-relaxed">
              {t.researchInterest}
          </p>
          <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-retro-dark">{t.activeProjects}</h4>
              <ul className="list-disc list-inside text-sm text-retro-dark/70 space-y-1">
                  <li>{t.project1}</li>
              </ul>
          </div>
        </div>
      )
    }
  ];
};
