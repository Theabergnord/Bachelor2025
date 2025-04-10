const decisionTreeDataEN = [
    {
      id: 'q1',
      question: 'Is the athlete over 18 years old?',
      options: [
        {
          label: 'Yes',
          next: 'q2',
        },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage: 'It is not recommended to measure BC in athletes under 18 years old.',
        },
      ],
    },
    {
      id: 'q2',
      question: 'Does the athlete have access to a health and performance team?',
      options: [
        {
          label: 'Yes',
          next: 'q3',
        },
        {
          label: 'No',
          feedbackType: 'yellow',
          feedbackMessage: 'It is recommended the athlete has access to support personnel.',
        },
      ],
    },
    {
      id: 'q3',
      question: 'Does the athlete have a strained relationship with food?',
      options: [
        {
          label: 'Yes',
          feedbackType: 'red',
          feedbackMessage: 'Feedback incoming!',
        },
        {
          label: 'No',
          next: 'q4',
        },
      ],
    },
    {
      id: 'q4',
      question: 'Is the measurement necessary for medical purposes?',
      options: [
        {
          label: 'Yes',
          feedbackType: 'green',
          feedbackMessage: 'Approved!',
        },
        {
          label: 'Nei',
          feedbackType: 'red',
          feedbackMessage: 'Declined!',
        },
      ],
    },
  ];
  
  export default decisionTreeDataEN;