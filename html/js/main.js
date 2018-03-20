;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};



	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top-50
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};



	// Animations
	// Home

	var homeAnimate = function() {
		if ( $('#fh5co-home').length > 0 ) {	

			$('#fh5co-home').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-home .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};


	var introAnimate = function() {
		if ( $('#fh5co-intro').length > 0 ) {	

			$('#fh5co-intro').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-intro .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInRight animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 1000);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var workAnimate = function() {
		if ( $('#fh5co-work').length > 0 ) {	

			$('#fh5co-work').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-work .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};


	var testimonialAnimate = function() {
		var testimonial = $('#fh5co-testimonials');
		if ( testimonial.length > 0 ) {	

			testimonial.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = testimonial.find('.to-animate').length,
						sec = parseInt((sec * 200) - 400);

					setTimeout(function() {
						testimonial.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						testimonial.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInDown animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, sec);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var servicesAnimate = function() {
		var services = $('#fh5co-services');
		if ( services.length > 0 ) {	

			services.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = services.find('.to-animate').length,
						sec = parseInt((sec * 200) + 400);

					setTimeout(function() {
						services.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						services.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, sec);


					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var aboutAnimate = function() {
		var about = $('#fh5co-about');
		if ( about.length > 0 ) {	

			about.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var logosAnimate = function() {
		var logos = $('#fh5co-logos');
		if ( logos.length > 0 ) {	

			logos.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					setTimeout(function() {
						logos.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');

						
				}
			} , { offset: '94%' } );

		}
	};

	var merchantAnimate = function() {
		var merchant = $('#fh5co-merchant');
		if ( merchant.length > 0 ) {	

			merchant.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						merchant.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var donationAnimate = function() {
		var donation = $('#fh5co-donation');
		if ( donation.length > 0 ) {	

			donation.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						donation.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var identityAnimate = function() {
		var identity = $('#fh5co-identity');
		if ( identity.length > 0 ) {	

			identity.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						identity.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};

	var countersAnimate = function() {
		var counters = $('#fh5co-counters');
		if ( counters.length > 0 ) {	

			counters.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = counters.find('.to-animate').length,
						sec = parseInt((sec * 200) + 400);

					setTimeout(function() {
						counters.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						counters.find('.js-counter').countTo({
						 	formatter: function (value, options) {
				      		return value.toFixed(options.decimals);
				   		},
						});
					}, 400);

					setTimeout(function() {
						counters.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, sec);

					

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};


	var contactAnimate = function() {
		var contact = $('#fh5co-contact');
		if ( contact.length > 0 ) {	

			contact.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 300, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '94%' } );

		}
	};



	var mainAnimate = function() {
	  var main = $('#home-section');
	  if ( main.length > 0 ) { 

	    main.waypoint( function( direction ) {
	                  
	      if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	        setTimeout(function() {
	          main.find('.to-animate').each(function( k ) {
	            var el = $(this);
	            
	            setTimeout ( function () {
	              el.addClass('fadeInUp animated');
	            },  k * 300, 'easeInOutExpo' );
	            
	          });
	        }, 200);

	        $(this.element).addClass('animated');
	          
	      }
	    } , { offset: '94%' } );

	  }
	};


	var aboutAnimate = function() {
	    var about = $('#about-section');
	    if ( about.length > 0 ) { 

	      about.waypoint( function( direction ) {
	                    
	        if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	          setTimeout(function() {
	            about.find('.to-animate').each(function( k ) {
	              var el = $(this);
	              
	              setTimeout ( function () {
	                el.addClass('fadeInUp animated');
	              },  k * 300, 'easeInOutExpo' );
	              
	            });
	          }, 200);

	          $(this.element).addClass('animated');
	            
	        }
	      } , { offset: '94%' } );

	    }
	  };

	  var about2Animate = function() {
	        var about2 = $('#about2-section');
	        if ( about2.length > 0 ) { 

	          about2.waypoint( function( direction ) {
	                        
	            if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	              setTimeout(function() {
	                about2.find('.to-animate').each(function( k ) {
	                  var el = $(this);
	                  
	                  setTimeout ( function () {
	                    el.addClass('fadeInUp animated');
	                  },  k * 300, 'easeInOutExpo' );
	                  
	                });
	              }, 200);

	              $(this.element).addClass('animated');
	                
	            }
	          } , { offset: '94%' } );

	        }
	      };


	  var featuresAnimate = function() {
	      var features = $('#features-section');
	      if ( features.length > 0 ) { 

	        features.waypoint( function( direction ) {
	                      
	          if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	            setTimeout(function() {
	              features.find('.to-animate').each(function( k ) {
	                var el = $(this);
	                
	                setTimeout ( function () {
	                  el.addClass('fadeInUp animated');
	                },  k * 300, 'easeInOutExpo' );
	                
	              });
	            }, 200);

	            $(this.element).addClass('animated');
	              
	          }
	        } , { offset: '94%' } );

	      }
	    };
	
	var nodesAnimate = function() {
	    var nodes = $('#nodes-section');
	    if ( nodes.length > 0 ) { 

	      nodes.waypoint( function( direction ) {
	                    
	        if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	          setTimeout(function() {
	            nodes.find('.to-animate').each(function( k ) {
	              var el = $(this);
	              
	              setTimeout ( function () {
	                el.addClass('fadeInUp animated');
	              },  k * 300, 'easeInOutExpo' );
	              
	            });
	          }, 200);

	          $(this.element).addClass('animated');
	            
	        }
	      } , { offset: '94%' } );

	    }
	  };

	  var walletsAnimate = function() {
	      var wallets = $('#wallets-section');
	      if ( wallets.length > 0 ) { 

	        wallets.waypoint( function( direction ) {
	                      
	          if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	            setTimeout(function() {
	              wallets.find('.to-animate').each(function( k ) {
	                var el = $(this);
	                
	                setTimeout ( function () {
	                  el.addClass('fadeInUp animated');
	                },  k * 300, 'easeInOutExpo' );
	                
	              });
	            }, 200);

	            $(this.element).addClass('animated');
	              
	          }
	        } , { offset: '94%' } );

	      }
	    };

	    var services2Animate = function() {
	        var services2 = $('#services-section');
	        if ( services2.length > 0 ) { 

	          services2.waypoint( function( direction ) {
	                        
	            if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	              setTimeout(function() {
	                services2.find('.to-animate').each(function( k ) {
	                  var el = $(this);
	                  
	                  setTimeout ( function () {
	                    el.addClass('fadeInUp animated');
	                  },  k * 300, 'easeInOutExpo' );
	                  
	                });
	              }, 200);

	              $(this.element).addClass('animated');
	                
	            }
	          } , { offset: '94%' } );

	        }
	      };


	     var projectsAnimate = function() {
	         var projects = $('#projects-section');
	         if ( projects.length > 0 ) { 

	           projects.waypoint( function( direction ) {
	                         
	             if( direction === 'down' && !$(this.element).hasClass('animated') ) {

	               setTimeout(function() {
	                 projects.find('.to-animate').each(function( k ) {
	                   var el = $(this);
	                   
	                   setTimeout ( function () {
	                     el.addClass('fadeInUp animated');
	                   },  k * 300, 'easeInOutExpo' );
	                   
	                 });
	               }, 200);

	               $(this.element).addClass('animated');
	                 
	             }
	           } , { offset: '94%' } );

	         }
	       };

       var exchangesAnimate = function() {
           var exchanges = $('#exchanges-section');
           if ( exchanges.length > 0 ) { 

             exchanges.waypoint( function( direction ) {
                           
               if( direction === 'down' && !$(this.element).hasClass('animated') ) {

                 setTimeout(function() {
                   exchanges.find('.to-animate').each(function( k ) {
                     var el = $(this);
                     
                     setTimeout ( function () {
                       el.addClass('fadeInUp animated');
                     },  k * 300, 'easeInOutExpo' );
                     
                   });
                 }, 200);

                 $(this.element).addClass('animated');
                   
               }
             } , { offset: '94%' } );

           }
         };

         var faqAnimate = function() {
             var faq = $('#faq-section');
             if ( faq.length > 0 ) { 

               faq.waypoint( function( direction ) {
                             
                 if( direction === 'down' && !$(this.element).hasClass('animated') ) {

                   setTimeout(function() {
                     faq.find('.to-animate').each(function( k ) {
                       var el = $(this);
                       
                       setTimeout ( function () {
                         el.addClass('fadeInUp animated');
                       },  k * 300, 'easeInOutExpo' );
                       
                     });
                   }, 200);

                   $(this.element).addClass('animated');
                     
                 }
               } , { offset: '94%' } );

             }
           };


	
	

	// Document on load.
	$(function(){

		parallax();

		burgerMenu();

		clickMenu();

		windowScroll();

		navigationSection();

		goToTop();


		// Animations from graphics
		homeAnimate();
		introAnimate();
		workAnimate();
		testimonialAnimate();
		servicesAnimate();
		aboutAnimate();
		logosAnimate();
		merchantAnimate();
		donationAnimate();
		identityAnimate();
		countersAnimate();
		contactAnimate();

		//index.html
		// mainAnimate(); //this will animate all to-animate items all in at once
		aboutAnimate();
		about2Animate();
		featuresAnimate();
		nodesAnimate();
		walletsAnimate();
		services2Animate();
		projectsAnimate();
		exchangesAnimate();
		faqAnimate();


		

	});


}());