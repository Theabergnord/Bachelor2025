const decisionTreeDataEN = [
  {
    id: 'q1',
    question: 'Is the athlete over 18 years old?',
    options: [
      { label: 'Yes', next: 'q3' },
      { label: 'No', next: 'q2' },
    ],
  },
  {
    id: 'q2',
    question: 'Is the BC assessment indicated for medical purposes or other exceptional circumstances?',
    visibleIf: {
      previousQuestion: 'q1',
      expectedAnswer: 'No',
    },
    options: [
      { label: 'Yes', next: 'q3' },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage:
          'It is not recommended to measure BC of athletes under the age of 18 years old unless indicated for medical purposes or other exceptional circumstances.\n \nYoung athletes will benefit much more from focusing on the fundamental elements of training, nutrition and recovery to improve their sport specific technique, physical capacity and mental robustness, hence increase their performance abilities.',
      },
    ],
  },
  {
    id: 'q3',
    question: 'Is the athlete competing at tier 3 or above?',
    options: [
      { label: 'Yes', next: 'q4' },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage:
          'It is not recommended to measure BC of athletes competing below Tier 3. They are less likely to have the appropriate support in place and will benefit from focusing on the fundamental elements of training, nutrition and recovery to improve their sport specific technique, physical capacity and mental robustness, hence increase their performance abilities.',
      },
    ],
  },
  {
    id: 'q4',
    question: 'Are there concerns around eating behaviours or physique/body image anxiety?',
    options: [
      {
        label: 'Yes',
        next: 'q5',
      },
      {
        label: 'No',
        next: 'q6',
      },
    ],
  },
  {
    id: 'q5',
    question: 'Is there medical purposes for the BC assessment, AND a medical support team to follow up?',
    visibleIf: {
      previousQuestion: 'q4',
      expectedAnswer: 'Yes',
    },
    options: [
      {
        label: 'Yes',
        next: 'q6',
      },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage: 'It is not recommended to measure BC.',
      },
    ],
  },
  {
    id: 'q6',
    question:
      'Does the athlete have appropriate access to members of an athlete health and performance team?',
    options: [
      { label: 'Yes', next: 'q8' },
      { label: 'No', next: 'q7' },
    ],
  },
  {
    id: 'q7',
    question:
      'Are you able to provide them support in accessing any or most of these individuals?',
    visibleIf: {
      previousQuestion: 'q6',
      expectedAnswer: 'No',
    },
    options: [
      {
        label: 'Yes',
        feedbackType: 'yellow',
        feedbackMessage:
          'While it is preferable to have an athlete health and performance team in place, we recognise this is not widespread and therefore find it sufficient for the athlete to be able to access support from each of these team members listed.',
        next: 'q8',
      },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage:
          'If athletes cannot access the support or services of the individuals above, BC assessment or manipulation is not recommended.',
      },
    ],
  },
  {
    id: 'q8',
    question:
      'Is there a sound and supported rationale for assessment/manipulation of BC, without causing harm to the athlete?',
    options: [
      {
        label: 'Yes',
        next: 'q9',
      },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage:
          'There is no need for the BC assessment.\n \n Reinforce nutrition messaging – prioritise fuelling and recovery while maintaining health.',
      },
    ],
  },
  {
    id: 'q9',
    question: 'Have you assessed athlete readiness?',
    options: [
      {
        label: 'Yes',
        next: 'q10',
      },
      {
        label: 'No',
        feedbackType: 'red',
        feedbackMessage:
          'Either assess athlete readiness and revisit this question or do not proceed with any BC measurement.',
      },
    ],
  },
  {
    id: 'q10',
    question:
      'Are there concerns regarding eating behaviour, history of EDs, body image/physique anxiety?',
    options: [
      {
        label: 'Yes',
        feedbackType: 'red',
        feedbackMessage:
          'It is not recommended to measure BC, and it should only be considered for medical purposes. Concerns should be raised with the relevant support staff and the athlete should be signposted to appropriate support.',
      },
      {
        label: 'No',
        feedbackType: 'green',
        feedbackMessage: 'Proceed to the next stage.',
        next: 't1',
      },
    ],
  },
  {
    id: 't1',
    isTransition: true,
    message: 'Step 1 is complete.\n \nYou may now proceed to Step 2.',
    next: 'q11',
  }
  
];

export default decisionTreeDataEN;
