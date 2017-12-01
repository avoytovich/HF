

const TIME_FORMAT = 'DD MMM YYYY';

export const ORGANISATION_PAGE = {
  key:         'organizations',
  title:       'Organizations',
  tableHeader: [
    { title: 'Organization',    key: 'organization',},
    { title: 'Contact Person',  key: 'contact',     },
    { title: 'Users',           key: 'users',       },
    { title: 'Subscription',    key: 'subscription',},
    { title: 'Start',           key: 'start',       },
    { title: 'Ending',          key: 'ending',      },
  ],
};

export const CLINICS_PAGE = {
  key: 'clinics',
  title: 'Clinics',
  tableHeader: [
    { title: 'Organization',    key: 'organization',},
    { title: 'Contact Person',  key: 'contact',     },
    { title: 'Users',           key: 'users',       },
    { title: 'Subscription',    key: 'subscription',},
    { title: 'Start',           key: 'start',       },
    { title: 'Ending',          key: 'ending',      },
  ],
};

export const USERS_PAGE = {
  key: 'users',
  title: 'Users',
  tableHeader: [
    { title: 'Organization',    key: 'organization',},
    { title: 'Contact Person',  key: 'contact',     },
    { title: 'Users',           key: 'users',       },
    { title: 'Subscription',    key: 'subscription',},
    { title: 'Start',           key: 'start',       },
    { title: 'Ending',          key: 'ending',      },
  ],
};

export const RESOURCE_PAGE = {
  key: 'resource',
  title: 'Resource',
  tableHeader: [
    { title: 'Organization',    key: 'organization',},
    { title: 'Contact Person',  key: 'contact',     },
    { title: 'Users',           key: 'users',       },
    { title: 'Subscription',    key: 'subscription',},
    { title: 'Start',           key: 'start',       },
    { title: 'Ending',          key: 'ending',      },
  ],
};


export const TEST_DIAGNOSTIC_FLOW_PAGE = {
  key: 'test-diagnostic-flow',
  title: 'Test Diagnostic Flow',
  tableHeader: [
    { title: 'Organization',    key: 'organization',},
    { title: 'Contact Person',  key: 'contact',     },
    { title: 'Users',           key: 'users',       },
    { title: 'Subscription',    key: 'subscription',},
    { title: 'Start',           key: 'start',       },
    { title: 'Ending',          key: 'ending',      },
  ]
};

// Matrix Pages
export const DIAGNOSIS_TAB = {
  key: 'diagnosis',
  title: 'Diagnosis',
  tableHeader: [
    {
      title: 'Name',        key: 'title',       className: 'left'
    },
    {
      title: 'Type',        key: 'type',        className: 'left'
    },
    {
      title: 'Body Areas',  key: 'area',        className: 'center'
    },
    {
      title: 'Key',         key: 'key',         className: 'left'
    },
    {
      title: 'Sequence',    key: 'step',        className: 'center', type: 'number', format: ''
    },
    {
      title: 'Answer type', key: 'answer.type', className: 'center'
    },
    {
      title: 'Created',     key: 'created_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
  ]
};

export const CONDITIONS_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    {
      title: 'Name',        key: 'title',       className: 'left'
    },
    {
      title: 'Body Areas',  key: 'area',        className: 'center'
    },
    {
      title: 'Key',         key: 'key',         className: 'left'
    },
    {
      title: 'Created by',  key: 'created_by',  className: 'left'
    },
    {
      title: 'Created',     key: 'created_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
    {
      title: 'Updated',     key: 'updated_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
  ]
};

export const TREATMENTS_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    {
      title: 'Name',        key: 'title', className: 'left'
    },
    {
      title: 'Body Areas',  key: 'area',        className: 'center'
    },
    {
      title: 'Key',         key: 'key',         className: 'left'
    },
    {
      title: 'Created by',  key: 'created_by',  className: 'left'
    },
    {
      title: 'Created',     key: 'created_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
    {
      title: 'Updated',     key: 'updated_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
  ]
};

export const PACKAGES_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    {
      title: 'Name',        key: 'name',       className: 'left'
    },
    {
      title: 'Body Areas',  key: 'body_area',   className: 'center'
    },
    {
      title: 'Key',         key: 'key',         className: 'left'
    },
    {
      title: 'Created by',  key: 'created_by',  className: 'left'
    },
    {
      title: 'Created',     key: 'created_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
    {
      title: 'Updated',     key: 'updated_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
  ]
};

export const EXERCISES_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    {
      title: 'Name',        key: 'name',       className: 'left'
    },
    {
      title: 'Body Areas',  key: 'body_area',   className: 'center'
    },
    {
      title: 'Key',         key: 'key',         className: 'left'
    },
    {
      title: 'Created by',  key: 'created_by',  className: 'left'
    },
    {
      title: 'Created',     key: 'created_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
    {
      title: 'Updated',     key: 'updated_at',  className: 'left', type: 'time',   format: TIME_FORMAT
    },
  ]
};

