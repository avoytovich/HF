import { COMMON } from '../../actions';
import { createReducer } from '../../utils';

const initialState = {
  data: [
    {
      id: '1',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '2',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '4',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '5',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '6',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '7',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '8',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '9',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    },
    {
      id: '10',
      organization: 'Organization Name',
      contact: 'Ukraine',
      users: 'Alex Smith',
      subscription: 'Subscription',
      created: '01 Mar  2017',
      created_by: 'John Doe',
    }
  ],
  pagination: {
    total       : 0,
    count       : 0,
    per_page    : 5,
    current_page: 0,
    total_pages : 0,
    order       : 'asc',
    orderBy     : 'users',
  }
};

export default createReducer(initialState, COMMON);