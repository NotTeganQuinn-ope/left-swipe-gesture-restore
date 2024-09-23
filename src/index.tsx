// Vendetta Plugin to Restore Swipe Left for Member List
import { registerPlugin } from '@vendetta/plugin';
import { findByProps } from "@vendetta/metro";
import { getByName } from "@vendetta/metro/filters";
import { before } from "@vendetta/patcher";

const Drawer = findByProps("openDrawer", "closeDrawer");
const MembersList = getByName("GuildChannelMembers");

let patcher;

function swipeLeftListener() {
    // Function to handle swipe left
    if (Drawer?.openDrawer && MembersList) {
        Drawer.openDrawer("MemberList", {
            render: MembersList,
        });
    }
}

export default registerPlugin({
    name: 'Restore Swipe Left for Member List',
    description: 'Restores the swipe left gesture to open the member list in Discord.',
    version: '1.0.0',
    authors: [{ name: 'NotTeganQuinn', id: 'NotTeganQuinn-ope' }],
    
    onLoad() {
        // Patch the swipe gesture to trigger swipeLeftListener when a left swipe is detected
        patcher = before('handleGesture', Drawer, swipeLeftListener);
    },

    onUnload() {
        // Remove the swipe gesture patch
        if (patcher) patcher();
    
}
});
