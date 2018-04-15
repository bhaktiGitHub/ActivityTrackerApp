var chai = require('chai');
 var chaiHttp = require('chai-http'); 
 var server = require('../app'); 
 var should = chai.should();

chai.use(chaiHttp);

describe('Blobs', function() { 
	it('should list ALL activities on GET', function(done)
	 { 
	 	chai.request(server) 
	 	.get('/myActivities/wak') 
	 	.end(function(err, res)
	 		{ 
	 			res.should.have.status(200); 
	 			res.should.be.json; 
	 			res.body.should.be.a('array');
	 			done(); 
	 		}); 
	 });

	it('should add a SINGLE record on POST', function(done)
	 { 
	 	chai
	 	.request(server) 
	 	.post('/newActivity') 
	 	.send(
	 		{
    
			    "days": [
			        "monday",
			        "tuesday",
			        "wednesday",
			        "thursday",
			        "friday",
			        "saturday",
			        "sunday"
			    ],
			    "weeklyFrequency": "1",
			    "monthlyFrequency": "start",
			    "dayTime": [],
			    "name": "Cheat day ",
			    "icon": "icon2",
			    "schedule": "Weekly",
			    
			}) 
	 	.end(function(err, res)
	 		{ 
	 			res.should.have.status(201); 
	 			res.should.be.json; 
	 			res.body.should.be.a('object'); 
	 			done(); 
	 		}); });
	it('should delete a SINGLE activity on DELETE', function(done) 
		{ 
			chai
			.request(server) 
			.get('/myActivities/wak') 
			.end(function(err, res){ 
				console.log(res.body);
				chai
				.request(server) 
				.delete('/activity/'+res.body[0]._id) 
				// .send({'name': 'newAct37'}) 
				.end(function(error, response){ 
					response.should.have.status(202); 
					response.should.be.json; 
					response.body.should.be.a('object'); 
					done(); 
				}); 
			}); 
		});
	});
