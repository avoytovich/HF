const TIME_FORMAT = 'DD MMM YYYY';

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
    { title: 'Name',                 key: 'title',       className: 'left'                                        },
    { title: 'Specific Description', key: 'description', className: 'left'                                        },
    { title: 'Body Areas',           key: 'area',        className: 'center'                                      },
    { title: 'Key',                  key: 'key',         className: 'left'                                        },
    { title: 'Sequence',             key: 'step',        className: 'center', type: 'number', format: ''          },
    { title: 'Created',              key: 'created_at',  className: 'left',   type: 'time',   format: TIME_FORMAT },
    { title: 'Last Edited',          key: 'updated_at',  className: 'left',   type: 'time',   format: TIME_FORMAT }
  ]
};

export const CONDITIONS_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                    },
    { title: 'Body Areas', key: 'area',       className: 'center'                                  },
    { title: 'Key',        key: 'key',        className: 'left'                                    },
    { title: 'Created by', key: 'created_by', className: 'left'                                    },
    { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const TREATMENTS_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                    },
    { title: 'Body Areas', key: 'area',       className: 'center'                                  },
    { title: 'Key',        key: 'key',        className: 'left'                                    },
    { title: 'Created by', key: 'created_by', className: 'left'                                    },
    { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const PACKAGES_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                    },
    { title: 'Body Areas', key: 'body_area',  className: 'center'                                  },
    { title: 'Key',        key: 'key',        className: 'left'                                    },
    { title: 'Created by', key: 'created_by', className: 'left'                                    },
    { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const EXERCISES_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    { title: 'Name',       key: 'title',      className: 'left'                                    },
    { title: 'Body Areas', key: 'body_area',  className: 'center'                                  },
    { title: 'Key',        key: 'key',        className: 'left'                                    },
    { title: 'Created by', key: 'created_by', className: 'left'                                    },
    { title: 'Created',    key: 'created_at', className: 'left', type: 'time', format: TIME_FORMAT },
    { title: 'Updated',    key: 'updated_at', className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

export const SEL_TAB = {
  key: 'conditions',
  title: 'Conditions',
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
    { title: 'Title',         key: 'name_real',        className: 'left assets-title-cell' },
    { title: 'Extension',     key: 'extension_origin', className: 'center' },
    { title: 'Type',          key: 'type',             className: 'left' },
    { title: 'Upload Date',   key: 'updated_at',       className: 'left', type: 'time',   format: TIME_FORMAT },
    { title: 'Size',          key: 'size',             className: 'left'},
  ]
};

export const COMPANIES_TAB = {
  key: 'conditions',
  title: 'Conditions',
  tableHeader: [
    { title: 'Company Name',   key: 'name',          className: 'left assets-title-cell'},
    { title: 'Contact Person', key: 'billing_info',  className: 'center'  },
    { title: 'Users',          key: 'name',          className: 'left'},
    { title: 'Activate',       key: 'created_at',    className: 'left', type: 'time', format: TIME_FORMAT }
  ]
};

