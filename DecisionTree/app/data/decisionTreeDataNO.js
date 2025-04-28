const decisionTreeDataNO = [
  {
    id: 'q1',
    question: 'Er utøveren over 18 år?',
    options: [
      { label: 'Ja', next: 'q3' },
      { label: 'Nei', next: 'q2' },
    ],
  },
  {
    id: 'q2',
    question: 'Finnes det medisinske årsaker eller andre unntakstilfeller som gir grunnlag for å vurdere BC?',
    visibleIf: {
      previousQuestion: 'q1',
      expectedAnswer: 'Nei',
    },
    options: [
      { label: 'Ja', next: 'q3' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle kroppssammensetning (BC) hos utøvere under 18 år, med mindre det foreligger medisinske årsaker eller andre unntakstilfeller.\n\nTidlig igangsettelse med veiing og måling av kroppssammensetning kan øke risikoen for at utøveren blir overopptatt av disse forholdene, noe som igjen kan føre til kroppsmisnøye og et forstyrret forhold til mat og kropp.\n\nYngre utøvere vil ha større utbytte av å fokusere på grunnleggende elementer innen trening, ernæring og restitusjon for å forbedre idrettsspesifikk teknikk, fysisk kapasitet og mental robusthet, og dermed øke prestasjonsevnen på en trygg og bærekraftig måte.',
      },
    ],
  },
  {
    id: 'q3',
    question: 'Konkurrerer utøveren på nasjonalt nivå eller høyere?',
    options: [
      { label: 'Ja', next: 'q4' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle BC hos utøvere som konkurrerer under nasjonalt nivå. Utøvere under nasjonalt nivå har mindre sannsynlighet for å ha nødvendig støtteapparat tilgjengelig, og vil ha større utbytte av å fokusere på grunnleggende elementer innen trening, ernæring og restitusjon for å forbedre idrettsspesifikk teknikk, fysisk kapasitet og mental robusthet, og dermed øke prestasjonsevnen.',
      },
    ],
  },
  {
    id: 'q4',
    question: 'Er det bekymringer knyttet til spiseatferd eller negativt kroppsbilde?',
    options: [
      { label: 'Ja', next: 'q5' },
      { label: 'Nei', next: 'q6' },
    ],
  },
  {
    id: 'q5',
    question: 'Foreligger det medisinske årsaker for vurdering av BC, OG finnes det et medisinsk støtteapparat som kan følge opp utøveren?',
    visibleIf: {
      previousQuestion: 'q4',
      expectedAnswer: 'Ja',
    },
    options: [
      { label: 'Ja', next: 'q6' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage: 'Det anbefales ikke å måle BC.',
      },
    ],
  },
  {
    id: 'q6',
    question: 'Har utøveren tilstrekkelig tilgang til medlemmer av et helsefaglig og prestasjonsrettet team?',
    options: [
      { label: 'Ja', next: 'q8' },
      { label: 'Nei', next: 'q7' },
    ],
  },
  {
    id: 'q7',
    question: 'Kan du bidra til at utøveren får tilgang til én eller flere av disse fagpersonene?',
    visibleIf: {
      previousQuestion: 'q6',
      expectedAnswer: 'Nei',
    },
    options: [
      {
        label: 'Ja',
        feedbackType: 'yellow',
        feedbackMessage:
          'Selv om det er ønskelig å ha et støtteapparat på plass, anerkjenner vi at dette ikke er tilfelle overalt, og anser det derfor som tilstrekkelig at utøveren har tilgang til støtte fra hver av de nevnte fagpersonene.',
        next: 'q8',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Dersom utøveren ikke har tilgang til støtte eller tjenester fra fagpersonene nevnt ovenfor, anbefales det ikke å gjennomføre vurdering eller endring av BC.',
      },
    ],
  },
  {
    id: 'q8',
    question: 'Finnes det et godt og tilstrekkelig grunnlag og behov for å gjennomføre en vurdering av BC, uten at det medfører skade for utøveren?',
    options: [
      { label: 'Ja', next: 'q9' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det er ikke behov for vurdering av BC.\n \nForsterk budskapet om ernæring – prioriter energitilførsel og restitusjon med fokus på helse.',
      },
    ],
  },
  {
    id: 'q9',
    question: 'Har du vurdert om utøveren er tilstrekkelig forberedt og egnet for å gjennomføre en BC-vurdering?',
    options: [
      { label: 'Ja', next: 'q10' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Vurder om utøveren er tilstrekkelig forberedt og egnet for å gjennomføre en BC-vurdering, og gå tilbake til dette spørsmålet, eller ikke gjennomfør noen måling av BC.',
      },
    ],
  },
  {
    id: 'q10',
    question: 'Er det bekymringer knyttet til spiseatferd, tidligere spiseforstyrrelser, eller negativt kroppsbilde?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle BC. Det bør kun vurderes dersom det foreligger medisinske grunner. Bekymringene bør tas opp med relevant støtteapparat, og utøveren bør henvises til riktig støtte.',
      },
      {
        label: 'Nei',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't1',
      },
    ],
  },
  {
    id: 't1',
    isTransition: true,
    message: 'Steg 1 er fullført.\n \nDu kan nå gå videre til steg 2.',
    next: 'q11',
  },
];

export default decisionTreeDataNO;

  