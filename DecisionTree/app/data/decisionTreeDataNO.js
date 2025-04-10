const decisionTreeDataNO = [
    {
      id: 'q1',
      question: 'Er utøveren over 18 år?',
      options: [
        {
          label: 'Ja',
          next: 'q2',
        },
        {
          label: 'Nei',
          feedbackType: 'red',
          feedbackMessage: 'Det anbefales ikke å måle BC hos utøvere under 18 år.',
        },
      ],
    },
    {
      id: 'q2',
      question: 'Har utøveren tilgang til helse- og prestasjonsteam?',
      options: [
        {
          label: 'Ja',
          next: 'q3',
        },
        {
          label: 'Nei',
          feedbackType: 'yellow',
          feedbackMessage: 'Det anbefales at utøveren har tilgang til støttepersoner.',
        },
      ],
    },
    {
      id: 'q3',
      question: 'Har utøveren et anstrengt forhold til mat?',
      options: [
        {
          label: 'Ja',
          feedbackType: 'red',
          feedbackMessage: 'Her kommer tilbakemeldingen!',
        },
        {
          label: 'Nei',
          next: 'q4',
        },
      ],
    },
    {
      id: 'q4',
      question: 'Er målingen nødvendig for medisinske formål?',
      options: [
        {
          label: 'Ja',
          feedbackType: 'green',
          feedbackMessage: 'Godkjent!',
        },
        {
          label: 'Nei',
          feedbackType: 'red',
          feedbackMessage: 'Avvist!',
        },
      ],
    },
  ];
  
  export default decisionTreeDataNO;
  