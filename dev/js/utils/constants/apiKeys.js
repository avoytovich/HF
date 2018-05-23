const environment = process.env.NODE_CUSTOM_MODE;

export const stripeKey = (environment === 'development') ?
  'pk_test_nd2AO9CvcrB17TXhe5kwjd8I' : 'pk_live_KuawtiI0tEN6URZyrVXrFDKF';
export const socketUrl = "http://18.195.167.42:3000";