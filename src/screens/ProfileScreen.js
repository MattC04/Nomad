import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { ProfileScreenNavigation } from '../Components/ProfileScreenNavigation';
import { Feather } from '@expo/vector-icons';
import PostsPage from '../Components/PostsPage';
import FriendsPage from '../Components/FriendsPage';
import BadgesPage from '../Components/BadgesPage';

function ProfileScreen({navigation}) {
    const [selectedTab, setSelectedTab] = useState('Posts');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleTabSelect = (tabName) => {
        setSelectedTab(tabName);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const Logout = () => {
        setIsModalVisible(!isModalVisible);
        navigation.navigate("LoginScreen");
    }

    const deleteAccount = ()  => {
        setIsModalVisible(!isModalVisible);
        navigation.navigate("LoginScreen");
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>  
                {/* Profile Picture Placeholder */}
                <View style={styles.profilePicPlaceholder} />

                {/* Settings Button */}
                <TouchableOpacity style={styles.settingsIcon} onPress={toggleModal}>
                    <Feather name="settings" size={24} color="white" />
                </TouchableOpacity>

                {/* Username */}
                <Text style={styles.username}>@username</Text>

                {/* Stats Container */}
                <View style={styles.statsContainer}>
                    {/* Friends Count */}
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Friends</Text>
                    </View>
                    {/* Badges Count */}
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Badges</Text>
                    </View>
                </View>

                {/* Spacer */}
                <View style={{ height: 30 }} />

                {/* Profile Screen Navigation */}
                <ProfileScreenNavigation onTabSelect={handleTabSelect} />

                {/* Tab Content */}
                {selectedTab === 'Posts' && <PostsPage />}
                {selectedTab === 'Friends' && <FriendsPage />}
                {selectedTab === 'Badges' && <BadgesPage />}
            </ScrollView>

            {/* Modal for Settings */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}>
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPressOut={toggleModal}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.modalButton} onPress={Logout}>
                            <Text style={styles.modalButtonText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={deleteAccount}>
                            <Text style={styles.modalButtonText}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    settingsIcon: {
        position: 'absolute',
        top: 40,
        right: 16,
        zIndex: 10,
    },
    profilePicPlaceholder: {
        position: 'absolute',
        top: 50,
        right: 30,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'white',
        zIndex: 5,
    },
    username: {
        position: 'absolute',
        top: 60,
        left: 18,
        color: 'white',
        marginLeft: 10,
        fontSize: 30,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 125,
        left: -94,
    },
    statItem: {
        alignItems: 'center',
        marginRight: 24,
    },
    statNumber: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        color: 'white',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        backgroundColor: '#1f2021',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20, // Rounded top left corner
        borderTopRightRadius: 20, // Rounded top right corner
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '80%',
        marginTop: 7,
        marginBottom: 7,
    },
    modalButtonText: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileScreen;
