const db = require('../models/dbcon');


module.exports = () =>{
    
    let exp = {};

    exp.addpost =  (req,res) =>{
        let insertJson = {};
        try{
            insertJson['title'] = req.body.title.toString().trim();
            insertJson['content'] = req.body.content.toString().trim();
            insertJson['date_posted'] = new Date();
            insertJson['author'] = req.user.uid;
        }
        catch (err){
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        db.query('INSERT INTO Post SET ?', [insertJson],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Inserted Successfully');
            return res.redirect('/posts');
        });
    };

    exp.getposts = (req,res) =>{
        db.query('SELECT title,name from Post INNER JOIN Users ON Users.uid = Post.author ORDER BY date_posted',(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            return res.status(200).send(result);
        });
    };

    exp.postbyid = (req,res)=>{
        db.query('SELECT title,content,date_posted,name as author,author as uid FROM Post INNER JOIN Users ON Users.uid = Post.author where id = ?', [req.params.id], (err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            return res.status(200).send(result[0]);
        })
    }

    exp.editpost = (req,res) =>{
        if(req.method == 'GET'){
            db.query('SELECT * FROM Post WHERE id = ? AND author = ?', [req.params.id,req.user.uid], (err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send('Internal Server Error');
                }
                if(result.length==0)
                    return res.status(404).send('Post Not Found');

                return res.status(200).send(result[0]);
            });
        }
        else if(req.method == 'POST'){
            let insertJson = {};
            try{
                insertJson['title'] = req.body.title.toString().trim();
                insertJson['content'] = req.body.content.toString().trim();
                insertJson['date_posted'] = new Date();
                insertJson['author'] = req.user.uid;
            }
            catch (err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            db.query('UPDATE Post SET ? WHERE id = ? AND author = ?', [insertJson,req.params.id,req.user.uid],(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send('Internal Server Error');
                }
                if(result.affectedRows == 0){
                    return res.status(200).send('Access Denied to Edit Post');
                }
                console.log('Updated Successfully');
                return res.redirect('/posts');
            });
        }
    };

    exp.deletepost = (req,res) =>{
        db.query('DELETE FROM Post where id = ? AND author = ?', [req.params.id,req.user.uid], (err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.affectedRows ==0)
                return res.status(404).send('Post Not Found');
            console.log('Deleted successfully');
            return res.redirect('/posts');
        })
    }


    
    return exp;
}