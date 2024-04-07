If does not install this it is going to crash:
npx expo install react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-gesture-handler react-native-safe-area-context react-native-reanimated


Before doing all of this change the version on the json files. Example if is 1.0.0 change to 1.0.1

How to publish to app store
write on the terminal after doing everything with the keys and certificates

npx eas build --platform ios                                                                         

This is to make our build in the expo platform
After it is going to ask you to login to your developer account, do that and the certificates, etc..

Make an app in the developer account and then

npx eas submit -p ios                                                                                

This is to submit the app to the app store

