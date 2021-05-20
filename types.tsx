/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Contacts: undefined;
  ChatRoom: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type chatRoom = {
  id: String;
  users: User[];
  lastMessage: message;
}

export type User = {
  id: String;
  imageUri: String;
  name: String;
  status: String;
}

export type message = {
  id: String;
  content: String;
  createdAt: String;
  user: User;
}
