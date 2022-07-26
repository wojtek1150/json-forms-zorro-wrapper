export const uiSchema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'General Info',
      elements: [
        {
          type: 'Group',
          label: 'Personal information',
          elements: [
            // {
            //   type: 'Control',
            //   placeholder: 'Aaa',
            //   scope: '#/properties/firstName',
            // },
            // {
            //   type: 'Control',
            //   scope: '#/properties/lastName',
            // },
            // {
            //   type: 'Control',
            //   scope: '#/properties/email',
            // },
            {
              type: 'Control',
              scope: '#/properties/city',
            },
            // {
            //   type: 'Control',
            //   scope: '#/properties/date',
            // },
          ],
        },
        // {
        //   type: 'Group',
        //   label: 'Social',
        //   elements: [
        //     {
        //       type: 'Control',
        //       scope: '#/properties/social/properties/linkedin',
        //       label: 'LinkedIn',
        //       labelIcon: 'linkedin',
        //     },
        //     {
        //       type: 'Control',
        //       scope: '#/properties/social/properties/twitter',
        //       label: 'Twitter',
        //       labelIcon: 'twitter',
        //     },
        //   ],
        // },
      ],
    },
    {
      type: 'Category',
      label: 'About You',
      elements: [
        {
          type: 'Group',
          label: 'Bio',
          description:
            'This is your opportunity to make your application personal and expand upon what makes you YOU.\n' +
            "We love to hear about what you do, what you're passionate about, and why you're interested in the program. Take your time with these questions.",
          elements: [
            {
              type: 'Control',
              scope: '#/properties/bio',
              additionalClasses: ['bio'],
              label: "Please provide a short bio that describes who you are, what you do and what you're passionate about",
              placeholder: 'Test',
              description:
                'Minimum 75 words or 2 minute video. You may choose to write this in your native language. You may also choose to write in the first ("I") or third ("She") person',
              options: {
                multi: true,
                minRows: 3,
              },
            },
          ],
        },
        {
          type: 'Group',
          additionalClasses: ['participant'],
          description: 'Are you an active or past participant in any of these other Google developer community programs?',
          elements: [
            {
              type: 'Control',
              label: 'Google Developer Groups (GDG)',
              scope: '#/properties/participant_gdg',
              options: {
                format: 'radio-button',
              },
            },
            {
              type: 'Control',
              label: 'Google Developer Student Clubs (GDSC)',
              scope: '#/properties/participant_gdsc',
              options: {
                format: 'radio-button',
              },
            },
            {
              type: 'Control',
              label: 'Google Developer Experts (GDE)',
              scope: '#/properties/participant_gde',
              options: {
                format: 'radio-button',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'Category',
      label: 'Community Impact',
      elements: [
        {
          type: 'Control',
          label:
            'Please confirm that you are able to actively participate as an Ambassador by either organizing or speaking at an event, creating content or mentoring others in the community in addition to engaging with the WTM program and development opportunities (10+ hours / quarter)',
          scope: '#/properties/active_participation',
          options: {
            format: 'radio',
          },
        },
        {
          type: 'Control',
          label: 'What role do you play as a leader in your community?',
          scope: '#/properties/role',
        },
        {
          type: 'Control',
          label: 'One of',
          scope: '#/properties/organize',
        },
      ],
    },
    {
      type: 'Category',
      label: 'Experience',
      elements: [
        {
          type: 'Control',
          label: 'Multiselect',
          placeholder: 'Choose min 3',
          scope: '#/properties/expertise',
          options: {
            format: 'multiselect',
            nzMaxTagCount: 2,
          },
        },
      ],
    },
    {
      type: 'Category',
      label: 'Final step',
      elements: [],
    },
  ],
  options: {
    variant: 'stepper',
    showNavButtons: true,
  },
};
