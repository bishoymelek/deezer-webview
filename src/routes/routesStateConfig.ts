const routesStateConfig = {
  genresList: {
    mapStateToProps: (state: any): any => {
      console.log(state);
    },
  },
};

export default routesStateConfig;
export { routesStateConfig };
