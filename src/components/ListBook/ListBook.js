import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import IconButton from '@material-ui/core/IconButton';
import { hideColumn, showColumn, addSelected, deleteSelected, changeSearch, setTag } from '../../actions/ListBookActions'
import { connect } from 'react-redux';
import Search from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';


class ToolbarList extends Component{   
    state = {
        anchorEl: null,        
        name: [],
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (event, checked) =>{
        let { hideColumn, showColumn } = this.props;
        const { value } = event.target;
        
        if(!checked){
            hideColumn(value);
            return;
        }                
        showColumn(value);
    };    

    handleChangeSearch = event => {                
        this.setState({searchValue: event.target.value});        
    }

    handleSearch = () => {       
        const { handleSearch } = this.props;
        let { searchValue } = this.state;
        handleSearch(searchValue);
    }
    
    handleTagSearch = name => event => {
        const { handleSearch, setTag } = this.props;
        const { value } = event.target;

        handleSearch(value);
        setTag(value);
    }

    render(){        
        const { anchorEl, searchValue } = this.state;
        const { header, hideKeys, tags, selectedTag } = this.props;
        const open = Boolean(anchorEl);  
        
        return(        
            <Toolbar>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <SettingsApplications />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                        maxHeight: 48 * 4.5,
                        width: 200,
                        },
                    }}
                    >
                    {header.map(option => (                        
                            <MenuItem key={option.key} >
                                <Checkbox 
                                  value={option.key}  
                                  onChange={this.handleChange} 
                                  checked={!hideKeys.has(option.key)}
                                />
                                {option.name}                                
                            </MenuItem>                        
                    ))}
                    </Menu>

                {!tags&&
                    <div>
                        <TextField
                            id="search"                             
                            value={searchValue}
                            onChange={this.handleChangeSearch}
                            margin="normal"
                        />                  
                        <IconButton color="primary" component="span" onClick={this.handleSearch}>
                            <Search />
                        </IconButton>
                    </div>
                }
                {tags&&
                  <FormControl >                    
                    <NativeSelect                      
                      style={{ minWidth: '160px'}}
                      onChange={this.handleTagSearch('age')}
                      input={<Input name="tag" id="tag-native-label-placeholder" value={selectedTag} />}
                    >
                      <option value=""></option>
                      {tags.map(name => (
                            <option key={'option' + name} value={name}> {name}</option>
                       ))}                      
                    </NativeSelect>                    
                  </FormControl>
                }

            </Toolbar>
        );     
    }
 }

 const mapDispatchToPropsToolBar = {
    setTag
};

const mapStateToPropsToolBar = state => ({    
    selectedTag: state.listbook.selectedTag
});

const ToolbarListR = connect(mapStateToPropsToolBar, mapDispatchToPropsToolBar)(ToolbarList);

 class ListBook extends Component{
    constructor(props){
        super(props);

        this.state = {            
            page: 0,
            rowsPerPage: 10            
        };
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    }  

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = key => {
        const { selected } = this.props;
        return selected.indexOf(key) > -1        
    }    

    handleClick = (event, book) => {
        const { addSelected } = this.props;
        const { savedRows } = this.props;
        let exist = savedRows.find(row => row.key === book.key);
        if (exist) {
            book.tags = exist.tags;
        } else {
            book.tags = [];
        }
        addSelected(book);        
    }        

    render(){
        const {  hideColumn, showColumn, searchMethod } = this.props;        
        const { header, data, hideKeys, loading, tags } = this.props;        
        const {  page, rowsPerPage } = this.state;       
        
        return (            
            <Paper>                
                <ToolbarListR         
                    header={header} 
                    hideKeys={hideKeys} 
                    hideColumn={hideColumn} 
                    showColumn={showColumn}                                                       
                    handleSearch={searchMethod}
                    changeSearch={changeSearch}
                    tags={tags}                    
                />
                {loading && <CircularProgress style={{ position: 'absolute',top: '50%', left: '50%'}}  />} 
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox  disabled/>
                        </TableCell>
                            {header
                                .filter(n => !hideKeys.has(n.key))
                                .map(n=> <TableCell key={'head'+n.key} >{n.name}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>                      
                        
                        {data
                        .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
                        .map((book, i) => {
                            const isSelected = this.isSelected(book.key);
                            return(
                            <TableRow
                                hover            
                                tabIndex={-1}            
                                onClick={event => this.handleClick(event, book)}
                                role="checkbox"
                                aria-checked={isSelected}                                
                                key={book.key}
                                selected={isSelected}
                            >
                                 <TableCell key={'check'+i} padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </TableCell>
                                
                                {header
                                    .filter(n => !hideKeys.has(n.key))
                                    .map(n => {
                                        if (n.key === 'cover_edition_key'){
                                          return <TableCell key={n.key+book.key} ><img style={{width: '60px', height:'100px'}} src={'//covers.openlibrary.org/b/olid/'+book[n.key]+".jpg"} alt='' /> </TableCell>                                          
                                        }

                                        return <TableCell key={n.key+book.key}> {book[n.key]} </TableCell>
                                         
                                    })
                                }        
                            </TableRow>
                            )
                        })
                        }
                    </TableBody>                    
                </Table>        

                <TablePagination
                    component="div"
                    colSpan={3}
                    count={data.length}
                    rowsPerPage = {rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />            
        </Paper>
        );
    }
}

const mapDispatchToProps = {
    hideColumn,
    showColumn,
    addSelected,
    deleteSelected,
    changeSearch    
};

const mapStateToProps = state => ({
    hideKeys: state.listbook.hideKeys,
    selected: state.listbook.selected,    
    search: state.listbook.search,
    loading: state.listbook.loading,
    savedRows: state.global.savedRows,
    header: state.global.header
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBook);