const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    """
    gets excersices

    Equivalent to GET /exercises
    """
    exercises(
      """
      patientId
      """
      patientId: String!
    ): [Exercise]

    allExercises: [Exercise]

    """
    Equivalent to GET /login
    """
    tokenPayload(password: String!, username: String!): TokenPayload

    """
    Equivalent to GET /user
    """
    user: User

    """
    Equivalent to GET /users
    """
    users: [User]

    myPatients: [User]

    getSchedule(patientId: ID!): TherapySchedule
  }

  type Exercise {
    createdAt: String
    updatedAt: String
    creator: Therapist
    id: ID!
    longDescription: String!
    pictures: [URLHolder]!
    scheduleInfo: ScheduleInfo
    shortDescription: String!
    title: String!
    videos: [URLHolder]!
    parameters: Parameters
    assesments: Assesments
    type: ExerciseType
    parentId: String
    creatorId: String
  }

 
  type Assesments{
    tiredness: Assesment
    dificulty: Assesment
    shortnessOfBreath: Assesment
    pain: Assesment

  }
  type Assesment{
    enabled: Boolean!
    name: String!
    title: String

  }


  type Parameters{
    sets: Parameter
    reps: Parameter
    repPerDay: Parameter
    hold: Parameter
    restPerSet: Parameter
    totalDuration: Parameter
  }

  type Parameter{
    enabled: Boolean!
    name: String!
    value: Int
    secondValue: Int
    valueType: ParameterType
    title: String

  }

  enum ExerciseType{
    Exercise,
    Educational
  }

  enum ParameterType{
    rep,
    time
  }

  type URLHolder{
    url: String!
    width: Int
    height: Int
    placeHolder: String
    type: String
    order: Int
    id: ID
  }

  type Therapist {
    excersices: [Exercise]!
    id: ID!
    name: String!
  }

  type ScheduleInfo {
    createdAt: String!
    endDate: String!
    id: ID!
    scheduleDays: [String]!
    scheduleType: ScheduleType!
    startDate: String!
    updatedAt: String!
  }

  type TherapySchedule {

    id: ID!
    updatedAt: String!
    createdAt: String!
    startDate: String!
    endDate: String!
    exercises: [Exercise]
    exerciseIds: [ID]
    days: [TherapyDay]
  }

  type TherapyDay{
    id: ID!
    updatedAt: String!
    createdAt: String!
    date: String!
    parameters: [ExerciseParameter]
  }

  type ExerciseParameter{
    parameters: Parameters
    exerciseId: ID
    title: String
    id: ID!
    enabled: Boolean
  }

  enum ScheduleType {
    DAILY
    TWODAYS
    THREEDAYS
  }

  type TokenPayload {
    token: String!
  }

  type User {
    id: ID!
    password: String
    patient: PatientInfo
    patientId: String
    therapist: Therapist
    therapistId: String
    type: Type!
    username: String!
  }

  type PatientInfo {
   
    id: ID!
    name: String!
    age: Int
    weight: Int
    schedule: TherapySchedule
  }

  enum Type {
    Admin
    Patient
    Therapist
  }

  type Mutation {
    """
    Adds an excersice to the system

    Equivalent to POST /exercises
    """
    addExercise(exerciseInput: ExerciseInput): Exercise

    """
    Adds an user to the system

    Equivalent to POST /users
    """
    addUser(userInput: UserInput): User

    updateExercise(updateInput: UpdateInput): Exercise

    addTherapySchedule(therapyScheduleInput: TherapyScheduleInput, patientId: ID!): TherapySchedule

  }
  input UpdateInput {
    id: ID!
    longDescription: String
    pictures: [URLHolderInput]
    shortDescription: String
    title: String
    type: ExerciseType
    videos: [URLHolderInput]
    parameters: ParametersInput
    assesments: AssesmentsInput
    state: String
    updatedAt: String
  }
  input ExerciseInput {
    longDescription: String!
    pictures: [URLHolderInput]!
    shortDescription: String!
    title: String!
    type: ExerciseType
    videos: [URLHolderInput]!
    parameters: ParametersInput
    assesments: AssesmentsInput
    state: String
    parentId: String
    
  }

  input URLHolderInput{
    url: String!
    width: Int
    height: Int
    placeHolder: String
    type: String
    id: ID
    size: Int
    order: Int
  }
  input TherapistInput {
    name: String!
  }
  input ParametersInput{
    sets: ParameterInput
    reps: ParameterInput
    repPerDay: ParameterInput
    hold: ParameterInput
    restPerSet: ParameterInput
    totalDuration: ParameterInput
  }

  input ParameterInput{
    enabled: Boolean!
    name: String!
    title: String
    value: Int
    secondValue: Int
    valueType: ParameterType

  }

  input AssesmentsInput{
    tiredness: AssesmentInput
    dificulty: AssesmentInput
    shortnessOfBreath: AssesmentInput
    pain: AssesmentInput

  }
  input AssesmentInput{
    enabled: Boolean!
    name: String!
    title: String


  }


  input ScheduleInfoInput {
    endDate: String!
    scheduleDays: [String]!
    scheduleType: ScheduleType!
    startDate: String!
  }

  input UserInput {
    password: String!
    patient: PatientInfoInput
    patientId: String
    therapist: TherapistInput
    therapistId: String
    type: Type!
    username: String!
  }

  input PatientInfoInput {
    name: String!
    age: Int
    weight: Int
  }

  input TherapyScheduleInput {
    id: ID
    startDate: String!
    endDate: String!
    exercises: [ID]!
    days: [TherapyDayInput]
  }

  input TherapyDayInput{
    id: ID
    date: String!
    parameters: [ExerciseParameterInput]!
  }

  input ExerciseParameterInput{
    parameters: ParametersInput!
    exerciseId: ID!
    title: String!
    enabled: Boolean!
  }

`;

module.exports = typeDefs;
