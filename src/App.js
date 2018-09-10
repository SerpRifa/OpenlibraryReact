import React, { Component } from 'react';
import ListBook from './components/ListBook/ListBook';
import Book from './components/Book/Book';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fetchBooks } from './actions/RequestActions'
import { setDataLocal, changeLang } from './actions/GlobalActions'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import SelectAllSharp from '@material-ui/icons/SelectAllSharp';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class App extends Component {
  state = {    
    selectedTab: 0
  }
  
  handleChange = (event, value) => {
    const { selectedTag } = this.props;
    let selectedTab = value;
    this.setState({ selectedTab });
    if (selectedTab === 2) {
      this.searchByTag(selectedTag);
    }
  };
  
  searchApi = (search) => {       
    const { fetchBooks } = this.props;
    fetchBooks(search);
  }

  searchByTag = (tag) => {
    const { setDataLocal } = this.props;
    const { savedRows } = this.props;    
    let finded = [...savedRows];

    if (tag !== '') {
       finded = savedRows.filter(n => {
        return n.tags.indexOf(tag) > -1;
      });
    }
    
    setDataLocal(finded);
  }

  componentDidMount() {
    const { search } = this.props;
    this.searchApi(search);
    this.searchByTag('');
  }

  changeLang = () => {
    const { changeLang } = this.props;
    const { lang } = this.props;
    
    if (lang === 'EN') {
      changeLang('RU');
    } else {
      changeLang('EN');
    }
  }

  render() {    
    const { selectedTab } = this.state;
    const { dataApi, localData, tags, m, lang } = this.props;

    return (
      <MuiThemeProvider>      
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Button color="inherit" onClick={this.changeLang} >{lang}</Button>
            </Toolbar>
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}                            
              indicatorColor="primary"
              textColor="primary"              
            >
              <Tab label={m['listbook']} icon={<FormatListBulleted />} />
              <Tab label={m['selectedBook']} icon={<SelectAllSharp />} />
              <Tab label={m['listSelectedBooks']} icon={<ThumbUp />} />
            </Tabs>
            
          </AppBar>
          
          {
            selectedTab === 0 && <TabContainer> 
              <ListBook  searchMethod={this.searchApi} data={dataApi}/> 
            </TabContainer>
          }

          {selectedTab === 1 && <TabContainer> <Book /> </TabContainer>} 
          {
            selectedTab === 2 && <TabContainer> 
            <ListBook  searchMethod={this.searchByTag} data={localData} tags={[...tags]}/> 
            </TabContainer>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  fetchBooks,
  setDataLocal,
  changeLang

};

const mapStateToProps = state => ({  
  dataApi:  state.listbook.data,
  localData: state.global.localData,
  tags: state.global.tags,
  savedRows: state.global.savedRows,
  search: state.listbook.search,
  m: state.global.m,
  lang: state.global.lang,
  selectedTag: state.listbook.selectedTag
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
