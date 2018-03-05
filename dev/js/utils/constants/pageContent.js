import PropTypes              from 'prop-types';

export const TIME_FORMAT      = 'DD MMM YYYY';
export const TIME_FORMAT_DOTS = 'DD.MM.YYYY';

export const COMPANIES_PAGE = {
  key:         'organizations',
  title:       'Organizations',
  tableHeader: [
    { title: 'Organization',    key: 'organization' },
    { title: 'Contact Person',  key: 'contact'      },
    { title: 'Users',           key: 'users'        },
    { title: 'Subscription',    key: 'subscription' },
    { title: 'Start',           key: 'start'        },
    { title: 'Ending',          key: 'ending'       }
  ],
};

export const CLINICS_PAGE = {
  key: 'clinics',
  title: 'Clinics',
  tableHeader: [
    { title: 'Organization',    key: 'organization' },
    { title: 'Contact Person',  key: 'contact'      },
    { title: 'Users',           key: 'users'        },
    { title: 'Subscription',    key: 'subscription' },
    { title: 'Start',           key: 'start'        },
    { title: 'Ending',          key: 'ending'       }
  ],
};

export const USERS_PAGE = {
  key: 'users',
  title: 'Users',
  tableHeader: [
    { title: 'Organization',    key: 'organization' },
    { title: 'Contact Person',  key: 'contact'      },
    { title: 'Users',           key: 'users'        },
    { title: 'Subscription',    key: 'subscription' },
    { title: 'Start',           key: 'start'        },
    { title: 'Ending',          key: 'ending'       }
  ],
};

export const ASSETS_PAGE = {
  key: 'assets',
  title: 'Assets',
  tableHeader: [
    { title: 'Organization',    key: 'organization' },
    { title: 'Contact Person',  key: 'contact'      },
    { title: 'Users',           key: 'users'        },
    { title: 'Subscription',    key: 'subscription' },
    { title: 'Start',           key: 'start'        },
    { title: 'Ending',          key: 'ending'       }
  ],
};

export const TEST_DIAGNOSTIC_FLOW_PAGE = {
  key: 'test-diagnostic-flow',
  title: 'Test Diagnostic Flow',
  tableHeader: [
    { title: 'Organization',    key: 'organization' },
    { title: 'Contact Person',  key: 'contact'      },
    { title: 'Users',           key: 'users'        },
    { title: 'Subscription',    key: 'subscription' },
    { title: 'Start',           key: 'start'        },
    { title: 'Ending',          key: 'ending'       }
  ]
};

export const DIAGNOSIS_TAB = {
  key: 'diagnosis',
  title: 'Diagnosis',
  tableHeader: [
    { title: 'Name', key: 'title', className: 'left' },
    // {
    //   title: 'Pain Areas',
    //   key: 'areas',
    //   className: 'center',
    //   sortKey: '--',
    //   type: 'areas'
    // },
    { title: 'Key',         key: 'key',         className: 'left'                                        },
    { title: 'Sequence',    key: 'step',        className: 'center', type: 'number', format: ''          },
    { title: 'Live',        key: 'testing',         className: 'left',type: 'in_testing'        },
    // { title: 'Created',     key: 'created_at',  className: 'left',   type: 'time',   format: TIME_FORMAT },
    { title: 'Updated', key: 'updated_at',  className: 'left',   type: 'time',   format: TIME_FORMAT }
  ]
};

export const LEVEL_UP = {
  key: 'diagnosis',
  title: 'Diagnosis',
  tableHeader: [
    { title: 'Name',          key: 'title',   className: 'left' },
    { title: 'Key',           key: 'key',     className: 'left' },
    { title: 'Sequence',      key: 'step',    className: 'center', type: 'number', format: '' },
    { title: 'Live',          key: 'testing', className: 'left',   type: 'in_testing'         },
    { title: 'Updated', key: 'updated_at',  className: 'left',   type: 'time',   format: TIME_FORMAT }
  ]
};

export const BODY_AREA_TAB = {
  key: 'areas',
  title: 'bodyArea',
  tableHeader: [
    { title: 'Key',        key: 'key',         className: 'left'                                       },
    { title: 'Title', key: 'title',       className: 'left'                                      },
    { title: 'Updated',    key: 'updated_at',  className: 'left',   type: 'time', format: TIME_FORMAT }
  ]
};

export const CONDITIONS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                        },
    // { title: 'Pain Areas', key: 'areas',      className: 'center', sortKey: '--', type: 'areas'        },
    { title: 'Key',        key: 'key',        className: 'left'                                        },
    { title: 'Live',       key: 'testing',         className: 'left',type: 'in_testing'      },
    // { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT     },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT     }
  ]
};

export const TREATMENTS_TAB = {
  key: 'treatments',
  title: 'TreatmentsTab',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                       },
    // { title: 'Pain Areas', key: 'areas',      className: 'center', sortKey: '--', type: 'areas'       },
    { title: 'Key',        key: 'key',        className: 'left'                                       },
    { title: 'Live',       key: 'testing',    className: 'left',type: 'in_testing'               },
    // { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT    },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT    }
  ]
};

export const PACKAGES_TAB = {
  key: 'packages',
  title: 'PackagesTab',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left',   sortKey: 'title'                   },
    // { title: 'Pain Areas', key: 'areas.data', className: 'center', sortKey: '--', type: 'areas'       },
    { title: 'Key',        key: 'key',        className: 'left'                                       },
    { title: 'Live',       key: 'testing_mode', className: 'left',type: 'in_testing'     },
    // { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT    },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT    }
  ]
};

export const EXERCISES_TAB = {
  key: 'exercise',
  title: 'ExerciseTab',
  tableHeader: [
    { title: 'Name',       key: 'name',   className: 'left', sortKey: 'name'                  },
    { title: 'Packages',   key: 'packages',   className: 'center', type: 'length', sortKey: '--'   },
    { title: 'Live',       key: 'testing_mode', className: 'left',type: 'in_testing'     },
    // { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const SEL_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Name',          key: 'name',          className: 'left'                                    },
    { title: 'Customer Name', key: 'customer_name', className: 'center'                                  },
    { title: 'Email',         key: 'email',         className: 'left'                                    },
    { title: 'Role',          key: 'role',          className: 'left'                                    },
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',       key: 'updated_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const ASSETS_TAB = {
  key: 'assets',
  title: 'Assets',
  tableHeader: [
    { title: 'Title',         key: 'name',        className: 'left assets-title-cell'                    },
    { title: 'Extension',     key: 'extension', className: 'center'                                    },
    { title: 'Type',          key: 'type',             className: 'left'                                      },
    { title: 'Upload Date',   key: 'updated_at',       className: 'left', type: 'time',   format: TIME_FORMAT },
    { title: 'Size',          key: 'properties.size',             className: 'left'                                      },
  ]
};

export const COMPANIES_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Company Name',   key: 'name',          className: 'left assets-title-cell'},
    { title: 'Contact Person', key: 'contact_info.contacts[0].name',       className: 'center'  },
    { title: 'Users',          key: 'users',         className: 'left'},
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const CLINICS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Clinic Name',    key: 'name',          className: 'left assets-title-cell'},
    { title: 'Contact Person', key: 'contact_info.contacts[0].name',          className: 'center'  },
    { title: 'Users',          key: 'users',         className: 'left'},
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const USERS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'ID Number',          key: 'user_id',          className: 'left'},
    { title: 'Status', key: 'status', className: 'center'  },
    { title: 'Age', key: 'birthday', className: 'center', type: 'birthday'  },
    { title: 'Gender', key: 'gender', className: 'center', type: 'gender'  },
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const PERSONAL_CABINET_USERS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'ID Number',  key: 'user_id',      className: 'left'},
    { title: 'Email',      key: 'email',      className: 'left'},
    { title: 'Status',     key: 'status', className: 'left' },
    { title: 'Created',   key: 'created_at',   className: 'left',   type: 'time', format: TIME_FORMAT }
  ]
};


export const COMPANIES_USERS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'ID Number',          key: 'user_id',          className: 'left'},
    { title: 'Company', key: 'customer_name', className: 'center'  },
    { title: 'Status', key: 'status', className: 'center' },
    { title: 'Age', key: 'birthday', className: 'center',  type: 'birthday'  },
    { title: 'Gender', key: 'gender', className: 'center', type: 'gender'  },
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const CLINICS_USERS_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'ID Number',          key: 'user_id',          className: 'left'},
    { title: 'Clinic', key: 'customer_name', className: 'center'  },
    { title: 'Status', key: 'status', className: 'center' },
    { title: 'Age', key: 'birthday', className: 'center', type: 'birthday'  },
    { title: 'Gender', key: 'gender', className: 'center', type: 'gender'  },
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const TEST_TAB = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Title',         key: 'title',         className: 'left'                                    },
    { title: 'Package',       key: 'type',          className: 'center'                                  },
    // { title: 'Pain Areas',    key: 'properties_temp',          className: 'center'                                  },
    { title: 'Date',          key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT },
  ]
};

export const TARIFF_PLANS = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Title',          key: 'name',          className: 'left'},
    { title: 'Type',          key: 'customer_type',          className: 'left'},
    { title: 'Cost/User, $',          key: 'cost_per_user',    className: 'left'},
    { title: 'Period',          key: 'period',          className: 'left'},
    { title: 'Cost/Period, $',          key: 'subscription_fee',          className: 'left'},
    { title: 'Created',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const BILLING_HISTORY = {
  key: 'conditions',
  title: 'ConditionsTab',
  tableHeader: [
    { title: 'Date',          key: 'updated_at',          className: 'left', type: 'time', format: TIME_FORMAT},
    { title: 'Amount',          key: 'sum',          className: 'left'},
    { title: 'Status',          key: 'cost_per_user',    className: 'left'},
  ]
};

export const CONTENT_TYPE_LIST = [
  {label: 'Question',        value: 'question'},
  {label: 'Functional test', value: 'functionalTest'},
];


export const ASSETS_ITEM  = PropTypes.PropTypes.shape({
  name          : PropTypes.string.isRequired,
  created_at    : PropTypes.number.isRequired,
  extension     : PropTypes.string,
  function_type : PropTypes.string,
  id            : PropTypes.number,
  path          : PropTypes.string,
  type          : PropTypes.string,
  updated_at    : PropTypes.number,
}).isRequired;