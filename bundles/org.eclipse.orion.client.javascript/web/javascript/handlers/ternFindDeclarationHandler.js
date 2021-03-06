/*******************************************************************************
 * @license
 * Copyright (c) 2015 IBM Corporation, Inc. and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *   IBM Corporation - Initial API and implementation
 ******************************************************************************/
/* eslint-env amd */
define([
    
], function() {
   
   /**
    * @description Computes the declaration for the given arguments
    * @param {Object} ternserver The server to query
    * @param {Object} args The arguments
    * @param {Function} callback The callback to call once the request completes or fails
    * @since 9.0
    */
   function computeDeclaration(ternserver, args, callback) {
       if(ternserver) {
	       ternserver.request({
	           query: {
		           type: "definition", 
		           file: args.meta.location,
		           end: args.params.offset
	           }}, 
	           function(error, decl) {
	               if(error) {
	                   callback({error: error.message, message: 'Failed to compute declaration'});
	               }
	               if(decl && Array.isArray(decl)) {
        			   callback({request: 'decl', decl:decl});
	               }
	           });
	   } else {
	       callback({message: 'Failed to compute declaration, server not started'});
	   }
   }
   
   return {
       computeDeclaration: computeDeclaration
   };
});