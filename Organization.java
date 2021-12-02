package com.aa.act.interview.org;

import java.util.Optional;
import java.util.Set;
import java.lang.StackWalker.Option;
import java.util.ArrayList;
import java.util.Collection;

public abstract class Organization {

	private Position root;
	
	public Organization() {
		root = createOrganization();
	}
	
	protected abstract Position createOrganization();
	
	/**
	 * hire the given person as an employee in the position that has that title
	 * 
	 * @param person
	 * @param title
	 * @return the newly filled position or empty if no position has that title
	 */
	public Optional<Position> hire(Name person, String title) {
	//
	  Position result = null;

	  // call recursive helper function if title is not root
	  if(!root.getTitle().equals(title))
	  {
		  result = hireHelper(root, title);
	  }
	  
	  // if title is in list of positions
      if( result != null )
      {

		  Employee newEmployee = new Employee(person);
		  Position newPosition = new Position(title, newEmployee);

		   return Optional.of(newPosition);
         
      }
      
		return Optional.empty();
	}

	// create a recursive helper to look for title or return null if not found
	public Position hireHelper(Position position, String title)
	{
		Collection<Position> directReports = position.getDirectReports();
		ArrayList<Position> listDirReports = new ArrayList<>(directReports);
		Position result = null;

		int index = 0;

		// keep looping until title is found or null if title does not exist
		// bubble up the returned position or null
		while(!position.getTitle().equals(title) && (result == null || !result.getTitle().equals(title)) )
		{
			if(!listDirReports.isEmpty() && index < listDirReports.size())
			{
				result = hireHelper(listDirReports.get(index), title);
				index++;
			}
			else
			{
				break;
			}
		}

		if(position.getTitle().equals(title))
		{
			result = position;
		}

		return result;
	}

	@Override
	public String toString() {
		return printOrganization(root, "");
	}
	
	private String printOrganization(Position pos, String prefix) {
		StringBuffer sb = new StringBuffer(prefix + "+-" + pos.toString() + "\n");
		for(Position p : pos.getDirectReports()) {
			sb.append(printOrganization(p, prefix + "\t"));
		}
		return sb.toString();
	}
}
