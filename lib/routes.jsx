FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content: <Home />
    })
    setTitle('Home')
  }
})



FlowRouter.route('/plans', {
  name: 'plans',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content: <PlanList />
    })
    setTitle('Plans');
  }
});


FlowRouter.route('/new-plan', {
  name : 'new plan',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content: <NewPlan />
    })
    setTitle('New Plan');
  }
})

FlowRouter.route('/edit-plan/:id', {
  name : 'edit plan',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content : <EditPlan planId={params.id} />
    })
    setTitle('Edit Plan');
  }
})



// Exercises
FlowRouter.route('/new-exercise', {
  name : 'new exercise',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content: <NewExercise />
    })
    setTitle('New Exercise');
  }
})

FlowRouter.route('/exercise/:id', {
  name : 'exercise',
  action: (params) => {
    ReactLayout.render(DefaultLayout, {
      content : <Exercise exerciseId={params.id} />
    })
    setTitle('Exercise');
  }
})

FlowRouter.route('/edit-exercise/:id', {
  name : 'Edit Exercise',
  action : (params) => {
    ReactLayout.render(DefaultLayout, {
      content: <EditExercise exerciseId={params.id} />
    })
    setTitle('Edit Exercise');
  }
})


FlowRouter.route('/exercises', {
  name : 'Exercises',
  action : (params) => {
    ReactLayout.render(DefaultLayout, {
      content : <ExerciseList />
    })
  }
})
// TRAINING

FlowRouter.route('/training/:id', {
  name : 'Training',
  action : (params) => {
    ReactLayout.render(DefaultLayout, {
      content : <Training trainingId={params.id} />
    })
    setTitle('Training');
  }
})


// Login

FlowRouter.route('/login', {
  name : 'login',
  action : (params) => {
    ReactLayout.render(DefaultLayout, {
      content : <AtFormReact />
    })
    setTitle('Login');
  }
})



setTitle = (title) => {
  let base = 'Fitness';

  if (title) {
    return document.title = `${title} - ${base}`;
  }
  return document.title = base;
};
