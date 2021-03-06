const { AuthenticationError } = require("apollo-server");
const { dataSources } = require(".");
const { paginateResults } = require("./datasources/localdataSource/dbUtil");

module.exports = {
  Query: {
    // launches: async (_, { pageSize = 20, after }, { dataSources }) => {
    //   const allLaunches = await dataSources.launchAPI.getAllLaunches();
    //   // we want these in reverse chronological order
    //   allLaunches.reverse();

    //   const launches = paginateResults({
    //     after,
    //     pageSize,
    //     results: allLaunches,
    //   });

    //   return {
    //     launches,
    //     cursor: launches.length ? launches[launches.length - 1].cursor : null,
    //     // if the cursor of the end of the paginated results is the same as the
    //     // last item in _all_ results, then there are no more results after this
    //     hasMore: launches.length
    //       ? launches[launches.length - 1].cursor !==
    //         allLaunches[allLaunches.length - 1].cursor
    //       : false,
    //   };
    // },

    allExercises: (root, args, context, info) => {

      return context.dataSources.userAPI.getExcercies(context.user.id)
    },

    myPatients: (root, args, context, info) => {

      return context.dataSources.userAPI.getMyPatients(context.user)
    },

    getSchedule: (root, args, context, info) => {
      if (context.user == null) {
        throw new AuthenticationError("API only available to logged in users");
      } else if (context.user != null)
        return context.dataSources.userAPI.getSchedule(args.patientId);
    }
    ,

    tokenPayload: (root, { username, password }, context, info) => {
      // console.log(obj);
      // console.log(args);
      // console.log(args);
      // console.log(info);

      return context.dataSources.userAPI.login({ username, password });
    },
    users: async (root, args, context, info) => {
      console.log(context);
      if (context.user == null) {
        throw new AuthenticationError("API only available to logged in users");
      } else if (context.user != null)
        return context.dataSources.userAPI.getAllUsers();
    },

    user: async (root, args, context, info) => {
      console.log(context);
      if (context.user == null) {
        throw new AuthenticationError("API only available to logged in users");
      } else if (context.user != null)
        return context.user
    },

    // verifyToken: async (_, { token }, { dataSources }) => {
    //   return dataSources.userAPI.getUserForAccessToken(token);
    // },

    getMyQuestionares: async (root, args, context, info) => {
      console.log(context);
      if (context.user == null) {
        throw new AuthenticationError("API only available to logged in users");
      } else if (context.user != null)

        return context.dataSources.userAPI.getMyQuestionares(context.user)
    },
  },

  User: {
    patient: (root, args, context, info) => {
      if (root.patientId)
        return context.dataSources.userAPI.getPatientInfo(root);
    },
    therapist: (root, args, context, info) => {
      if (root.therapistId)
        return context.dataSources.userAPI.getTherapistInfo(root);
    },
  },

  Therapist: {

    questionares: (root, args, context, info) => {
      if (context.user != null)
        return context.dataSources.userAPI.getMyQuestionares(context.user);
    },
  },

  PatientInfo: {
    schedule: (root, args, context, info) => {
      if (root.id)
        return context.dataSources.userAPI.getSchedule(root.id);
    },

  },

  TherapySchedule: {
    exercises: (root, args, context, info) => {
      if (root.exerciseIds)
        return context.dataSources.userAPI.getExercisesFromIDList(root.exerciseIds);
    },
  },

  TherapyDay: {
    questionares: (root, args, context, info) => {
      if (root.questionareIds.length > 0)
        return context.dataSources.userAPI.getQuestionare(root)
      return []
      // if (root.exerciseIds)
      //   return context.dataSources.userAPI.getExercisesFromIDList(root.exerciseIds);

      // TODO if there is args, or context of patient, 
    },
  },
  // Questainare: {
  //   answers: (root, args, context, info) => {

  //     console.log("questionare answer for ", root, context, args, info)

  //     //todo, if there is args or patient ID in root, get answers for this questionnare and day
  //   }
  // }
  // ,

  Mutation: {
    addUser: async (_, args, context) => {
      console.log(args);
      if (context.user) {
        return context.dataSources.userAPI.createUser(args.userInput, context.user);
      } else {
        throw new AuthenticationError("API not available for you");
      }
    },

    addTherapySchedule: async (root, args, context, info) => {

      return context.dataSources.userAPI.addSchedule(args.therapyScheduleInput, args.patientId, context.user.therapistId)

    },

    updateTherapySchedule: async (root, args, context, info) => {

      return context.dataSources.userAPI.updateSchedule(args.updateInput, args.patientId, context.user.therapistId)

    },

    addExercise: async (root, args, context, info) => {
      console.log("add exercise mutation", args)
      return context.dataSources.userAPI.createExercise(args.exerciseInput, context.user.id)
    },

    updateExercise: async (root, args, context, info) => {
      console.log("add exercise mutation", args)
      return context.dataSources.userAPI.updateExercise(args.updateInput)
    },

    submitEvaluation: async (root, args, context, info) => {

      if (context.user) {
        return context.dataSources.userAPI.submitEvaluation(args.evaluationInput);
      } else {
        throw new AuthenticationError("API not available for you");
      }
    },

    addQuestainare: async (root, args, context, info) => {

      if (context.user) {
        return context.dataSources.userAPI.addQuestionare(context.user, args.questainareInput);
      } else {
        throw new AuthenticationError("API not available for you");
      }
    },

    submitQuestionare: async (root, args, context, info) => {

      if (context.user) {
        return context.dataSources.userAPI.submitQuestionare(args.questionareAnswerInput);
      } else {
        throw new AuthenticationError("API not available for you");
      }
    },
  },
  // ,
  // Mutation: {
  //   bookTrips: async (_, { launchIds }, { dataSources }) => {
  //     const results = await dataSources.userAPI.bookTrips({ launchIds });
  //     const launches = await dataSources.launchAPI.getLaunchesByIds({
  //       launchIds,
  //     });

  //     return {
  //       success: results && results.length === launchIds.length,
  //       message:
  //         results.length === launchIds.length
  //           ? 'trips booked successfully'
  //           : `the following launches couldn't be booked: ${launchIds.filter(
  //               id => !results.includes(id),
  //             )}`,
  //       launches,
  //     };
  //   },
  //   cancelTrip: async (_, { launchId }, { dataSources }) => {
  //     const result = dataSources.userAPI.cancelTrip({ launchId });

  //     if (!result)
  //       return {
  //         success: false,
  //         message: 'failed to cancel trip',
  //       };

  //     const launch = await dataSources.launchAPI.getLaunchById({ launchId });
  //     return {
  //       success: true,
  //       message: 'trip cancelled',
  //       launches: [launch],
  //     };
  //   },
  //   login: async (_, { email }, { dataSources }) => {
  //     const user = await dataSources.userAPI.findOrCreateUser({ email });
  //     if (user) {
  //       user.token = Buffer.from(email).toString('base64');
  //       return user;
  //     }
  //   },
  //   uploadProfileImage: async(_, { file }, { dataSources }) =>
  //     dataSources.userAPI.uploadProfileImage({ file }),
  // },
  // Launch: {
  //   isBooked: async (launch, _, { dataSources }) =>
  //     dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  // },
  // Mission: {
  //   // make sure the default size is 'large' in case user doesn't specify
  //   missionPatch: (mission, { size } = { size: 'LARGE' }) => {
  //     return size === 'SMALL'
  //       ? mission.missionPatchSmall
  //       : mission.missionPatchLarge;
  //   },
  // },
  // User: {
  //   trips: async (_, __, { dataSources }) => {
  //     // get ids of launches by user
  //     const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

  //     if (!launchIds.length) return [];

  //     // look up those launches by their ids
  //     return (
  //       dataSources.launchAPI.getLaunchesByIds({
  //         launchIds,
  //       }) || []
  //     );
  //   },
  // },
};
