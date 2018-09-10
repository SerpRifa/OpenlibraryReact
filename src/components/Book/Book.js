import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { addTag, deleteTag, setTags } from '../../actions/BookActions'
import Input from '@material-ui/core/Input';

class Book extends Component{   
    
    state = {
        value: '',
        isValid: false
    }


    handleChange = event => {
        const {value} = event.target;
        this._validate(value);    
        this.setState({value: value});
    }

    _validate = value => {
        var re = /\s/;
        let isValid = !re.test(value);
        if (value.length < 1) {
            isValid = false;
        }
        this.setState({isValid: isValid});        
    }

    handleDelete = tag => () => {   
        const { deleteTag } = this.props;
        deleteTag(tag);
    }

    handlePressKey = event => {
        const { value, isValid } = this.state;
        const { addTag } = this.props;
        const { selectedRow } = this.props;

        if (event.key === 'Enter') {
            if (!isValid) {
                return;
            }

            let payload = { 
                row: selectedRow,
                value: value
            };
            addTag(payload);
            this.setState({value: ''});
        }
    }

    componentDidMount = () => {
        const { selectedRow, savedRows } = this.props;
        const { setTags } = this.props;

        if (!selectedRow) {
            return;
        }

        let findRow = savedRows.find(row => (selectedRow.key === row.key));
        if (findRow) {
            setTags(findRow.tags);
        }
    }
    
    render() {        
        const { selectedRow, tags, m } = this.props;
        const { value, isValid } = this.state;

        if (!selectedRow){
            return(
                <Typography gutterBottom variant="headline" component="h1">
                    {m['notSelected']}
                </Typography>
            )
        }       

        return(
            <div>
                <Paper style={{padding: 20}}>
                    <Typography gutterBottom variant="headline" component="h1" >
                        {selectedRow.cover_edition_key && 
                            <div> <img src={'//covers.openlibrary.org/b/olid/'+selectedRow.cover_edition_key+".jpg" } alt=''/></div>
                        }
                        {selectedRow.title_suggest}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h3">
                        {selectedRow.author_name&&selectedRow.author_name.map((n, i )=> <span key={'author'+i}> {n} </span>)}
                    </Typography>
                    <div>
                        <div>
                            <span>{m['year']}</span> {selectedRow.first_publish_year}
                        </div>                    
                    </div>
                </Paper>
                <Paper style={{padding: 20}}>
                    <Typography gutterBottom variant="headline" component="h3">
                        {m['tableContents']}
                    </Typography>
                    { selectedRow.subject&&selectedRow.subject.map((subject, i) =>  <div key={'subjectdiv'+i}><span key={'span'+i}>{subject}</span></div>)} 
                </Paper >
                <Paper style={{padding: 20}}>
                    <Typography gutterBottom variant="headline" component="h3">
                        {m['tags']}
                    </Typography>
                    {tags.map((tag, i) =>{                        
                        return(
                            <Chip
                                key={'Chip'+i}                                
                                label={tag}
                                onDelete={this.handleDelete(tag)}                                
                            />
                        )
                    })}
                    <br />
                    <Input
                        placeholder={m['addTag']}    
                        value={value}                    
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        error={!isValid}
                        onKeyPress={this.handlePressKey}
                        onChange={this.handleChange}
                    />
                </Paper>
            </div>
        )
    }
    
}

const mapDispatchToProps = {  
    addTag,
    deleteTag,
    setTags
};

const mapStateToProps = state => ({       
    selectedRow: state.listbook.selectedRow,
    tags: state.book.tags,
    savedRows: state.global.savedRows,
    m: state.global.m
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);