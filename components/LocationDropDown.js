import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Select, SelectTextBox, Option, OptionList } from 'react-native-multi-select';


export default class LocationDropDown extends Component {
    static propTypes = {};

    cities = [
        'baseball',
        'soccer',
        'weight-training',
        'basketball',
        'football',
        'mountain-biking',
        'running',
    ];

    state = {
        selectedItem: [],
        text: "",
        displayOptionList: false
    };

    updateText = text => {
        this.setState({text});
    };

    addItem = item => {
        this.setState({selectedItem: [...this.state.selectedItem, item]})
    };

    removeItem = removedItem => {
        this.setState({
            selectedItem: this.state.selectedItem.filter(item => {
                if (item._id !== removedItem._id)
                    return item;
            })
        });
    };

    render() {
        return (
            <Select style={styles.select}>
                <SelectTextBox
                    selectedItem={this.state.selectedItem}
                    placeholder={"شهر خود را انتخاب کنید."}
                    onPressOut={(removedItem) => this.setState({
                        selectedItem: this.state.selectedItem.filter(text => {
                            if (text !== removedItem)
                                return text;
                        })
                    })}
                    onTextInputFocus={() => this.setState({displayOptionList: true})}
                    onTextInputLoosFocus={() => this.setState({displayOptionList: false})}
                    onSelectTextBoxChanged={event => this.updateText(event.nativeEvent.text)}
                />
                <OptionList
                    text={this.state.text}
                    items={this.cities}
                    display={this.state.displayOptionList}
                    onAnItemSelected={item => this.addItem(item)}
                    removeItem={item => this.removeItem(item)}>
                    {this.cities.map((city, index) => <Option
                        onPress={item => this.setState({selectedItem: [...this.state.selectedItem, item]})}
                        key={index}
                        value={{_id: Math.random()}}>
                        {city}
                    </Option>)}
                </OptionList>
            </Select>
        );
    }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    select: {
        backgroundColor: 'white',
        width: width,
    }
});
