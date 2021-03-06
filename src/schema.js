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

    getMyQuestionares: [Questainare]
  }

  type Questainare{
    createdAt: String
    updatedAt: String
    creatorId: String
    creator: Therapist
    id: ID!
    uid: String
    title: String   
    questions: [Question]
    answers: [Answer]
    answered: Boolean

  }

  type Answer{
    id: ID!
    questionId: ID!
    answeredOptionId: ID
    answerStr: String

  }

  type Question{
    order: Int!
    id: ID!
    question: String!
    answerType: QuestionAnswerType!
    options: [QuestionOption]

  }

  type QuestionOption{
    order: Int
    id: ID!
    value: String
  }

  enum QuestionAnswerType{
    OPTIONS,
    TEXT
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
    parameters: [Parameter]
    assesments: [Assesment]
    type: ExerciseType
    parentId: String
    creatorId: String
    additionalInstructions: String
    instructions: String
  }


  type Assesment{
    id: ID!
    enabled: Boolean!
    name: String!
    title: String
    value: Int

  }


  type Parameter{

    id: ID!
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
    phoneNumber: String
    questionares: [Questainare]
  }

  type EvaluationResult{
    id: ID!
    exerciseId: ID!
    parameters: [Parameter]!
    feedback: String
    assesments: [Assesment]!
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
    evaluation: [EvaluationResult]
    questionares: [Questainare]
    questionareIds: [ID]

  }

  """
  // type ExerciseAssesment{
  //   assesments: Assesments
  //   exerciseId: ID
  //   id: ID
  // }
  """

  type ExerciseParameter{

    parameters: [Parameter]
    exerciseId: ID
    id: ID!
    enabled: Boolean
    additionalInstructions: String

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

    updateTherapySchedule(updateInput: UpdateTherapyScheduleInput!, patientId: ID!): TherapySchedule

    submitEvaluation(evaluationInput: EvaluationInput): TherapyDay

    addQuestainare(questainareInput: QuestainareInput): Questainare

    submitQuestionare(questionareAnswerInput :QuestionareAnswerInput): Questainare

  }

  input EvaluationInput{
    dayId: ID!
    exerciseId: ID!
    parameters: [ParameterInput]!
    feedback: String
    assesments: [AssesmentInput]!
  }


  input UpdateInput {
    id: ID!
    longDescription: String
    pictures: [URLHolderInput]
    shortDescription: String
    title: String
    type: ExerciseType
    videos: [URLHolderInput]
    parameters: [ParameterInput]
    assesments: [AssesmentInput]
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
    parameters: [ParameterInput]
    assesments: [AssesmentInput]
    state: String
    parentId: String
    additionalInstructions: String
    instructions: String

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
    phoneNumber: String
  }


  input ParameterInput{
    enabled: Boolean!
    name: String!
    title: String
    value: Int
    secondValue: Int
    valueType: ParameterType
    id: ID

  }


  input AssesmentInput{
    enabled: Boolean!
    name: String!
    title: String
    value: Int
    id: ID

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
  input UpdateTherapyScheduleInput {
    id: ID!
    startDate: String
    endDate: String
    exercises: [ID]
    days: [TherapyDayInput]
  }
  input TherapyDayInput{
    id: ID
    date: String!
    parameters: [ExerciseParameterInput]
    questionareIds: [ID]
  }

  input ExerciseParameterInput{
    parameters: [ParameterInput]!
    exerciseId: ID!
    enabled: Boolean!
    id: ID
    additionalInstructions: String

  }



  input QuestainareInput{
    title: String   
    questions: [QuestionInput]

  }

  input QuestionInput{
    order: Int!
    question: String!
    answerType: QuestionAnswerType!
    options: [QuestionOptionInput]
  
  }

  input QuestionOptionInput{
    order: Int
    value: String
  }


  input QuestionAnswerInput{

    questionId: ID!
    answeredOptionId: ID
    answerStr: String

  }

  input QuestionareAnswerInput{
    questionareIds: ID!
    dayId: ID!
    answers: [QuestionAnswerInput]
  }


`;

module.exports = typeDefs;
