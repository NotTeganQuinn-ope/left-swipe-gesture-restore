import { stylesheet, constants, React } from '@vendetta/metro/common';
import { manifest } from '@vendetta/plugin';
import { General, Forms } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import Credits from "./Dependent/Credits";
import SectionWrapper from "./Dependent/SectionWrapper";
import { Icons, Miscellaneous, Constants } from "../Common";
import { findByProps } from '@vendetta/metro';
import { semanticColors } from '@vendetta/ui';
import { ReactNative } from '@vendetta/metro/common';

const { FormRow, FormSwitch, FormDivider } = Forms;
const { ScrollView, View, Text } = General;

const Router = findByProps('transitionToGuild')

const styles = stylesheet.createThemedStyleSheet({
   icon: {
      color: semanticColors.INTERACTIVE_NORMAL
   },
   item: {
      color: semanticColors.TEXT_MUTED,
      fontFamily: constants.Fonts.PRIMARY_MEDIUM
   },
   container: {
      width: '90%',
      marginLeft: '5%',
      borderRadius: 10,
      backgroundColor: semanticColors.BACKGROUND_MOBILE_SECONDARY,
      ...Miscellaneous.shadow()
   },
   subheaderText: {
      color: semanticColors.HEADER_SECONDARY,
      textAlign: 'center',
      margin: 10,
      marginBottom: 50,
      letterSpacing: 0.25,
      fontFamily: constants.Fonts.PRIMARY_BOLD,
      fontSize: 14
   },
   image: {
      width: "100%",
      maxWidth: 350,
      borderRadius: 10
   }
});

/**
 * Main @arg Settings page implementation
 * @param manifest: The main plugin manifest passed donw as a prop.
 */
export default () => {
   useProxy(storage);

   const [tapUsernameMention, setTapUsernameMention] = React.useState(storage.tapUsernameMention);
   const [reply, setReply] = React.useState(storage.reply);

   return <ScrollView>
      <Credits 
         name={manifest.name}
         authors={manifest.authors}
      /> 
      <View style={{marginTop: 20}}>
         <SectionWrapper label='Preferences'>
            <View style={[styles.container]}>
               {ReactNative.Platform.OS !== "android" && <FormRow
                  label="Tap Username to Mention"
                  subLabel="Allows you to tap on a username to mention them instead of opening their profile."
                  onLongPress={() => Miscellaneous.displayToast(`By default, Discord opens a profile when tapping on a username in chat. With this, it now mentions them, like on Android.`, 'tooltip')}
                  leading={<FormRow.Icon style={styles.icon} source={Icons.Forum} />}
                  trailing={<FormSwitch
                     value={tapUsernameMention}
                     onValueChange={() => {
                        storage.tapUsernameMention = !storage.tapUsernameMention;
                        setTapUsernameMention(storage.tapUsernameMention);
                     }}
                  />}
               />}
               <FormDivider />
               <FormRow
                  label={`Double Tap To ${reply ? "Reply" : "Edit"}`}
                  subLabel={`Allows you to tap double tap on any of your messages to ${reply ? "reply" : "edit"} them.`}
                  onLongPress={() => Miscellaneous.displayToast(`When double tapping on any of your own messages, you can now start an edit!`, 'tooltip')}
                  leading={<FormRow.Icon style={styles.icon} source={reply ? Icons.Settings.Reply : Icons.Settings.Edit} />}
                  trailing={<FormSwitch
                     value={reply}
                     onValueChange={() => {
                        storage.reply = !storage.reply;
                        setReply(storage.reply);
                     }}
                  />}
               />
            </View>
         </SectionWrapper>
         <SectionWrapper label='Source'>
            <View style={styles.container}>
               <FormRow
                  label="Source"
                  subLabel={`Open the repository of ${manifest.name} externally.`}
                  onLongPress={() => Miscellaneous.displayToast(`Opens the repository of ${manifest.name} on GitHub in an external page to view any source code of the plugin.`, 'tooltip')}
                  leading={<FormRow.Icon style={styles.icon} source={Icons.Open} />}
                  trailing={() => <FormRow.Arrow />}
                  onPress={() => Router.openURL(Constants.plugin.source)}
               />
            </View>
         </SectionWrapper>
      </View>
      <Text style={styles.subheaderText}>
         {`Build: (${manifest.hash.substring(0, 8)})`}
      </Text>
   </ScrollView>
}