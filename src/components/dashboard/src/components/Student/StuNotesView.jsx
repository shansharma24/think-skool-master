// StuNotesView.jsx
import React, { useState, useEffect } from 'react';

const StuNotesView = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch notes
    const fetchNotes = async () => {
      try {
        // Mock data for notes and resources
        const mockNotes = [
          {
            id: 1,
            title: 'JavaScript ES6 Features',
            category: 'JavaScript',
            content: `# JavaScript ES6 Features

## Arrow Functions
Arrow functions provide a concise syntax for writing function expressions.

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

## Template Literals
Template literals allow embedded expressions and multi-line strings.

\`\`\`javascript
const name = 'World';
console.log(\`Hello, \${name}!\`);
\`\`\`

## Destructuring
Destructuring allows unpacking values from arrays or properties from objects.

\`\`\`javascript
const [a, b] = [1, 2];
const {name, age} = {name: 'John', age: 30};
\`\`\`
`,
            tags: ['ES6', 'JavaScript', 'Functions'],
            createdAt: '2024-11-15',
            updatedAt: '2024-11-20',
            author: 'Mentor Sarah'
          },
          {
            id: 2,
            title: 'React Component Lifecycle',
            category: 'React',
            content: `# React Component Lifecycle

## Mounting Phase
1. **constructor()** - Initialize state and bind methods
2. **static getDerivedStateFromProps()** - Update state based on props
3. **render()** - Return JSX
4. **componentDidMount()** - Side effects after component mounts

## Updating Phase
1. **static getDerivedStateFromProps()**
2. **shouldComponentUpdate()** - Optimize re-renders
3. **render()**
4. **getSnapshotBeforeUpdate()** - Capture DOM state
5. **componentDidUpdate()** - Side effects after update

## Unmounting Phase
- **componentWillUnmount()** - Cleanup

## Error Handling
- **static getDerivedStateFromError()**
- **componentDidCatch()**
`,
            tags: ['React', 'Lifecycle', 'Components'],
            createdAt: '2024-11-10',
            updatedAt: '2024-11-18',
            author: 'Mentor Mike'
          },
          {
            id: 3,
            title: 'Database Normalization Rules',
            category: 'Database',
            content: `# Database Normalization

## First Normal Form (1NF)
- Eliminate repeating groups
- Create separate table for each set of related data
- Identify each set with a primary key

## Second Normal Form (2NF)
- Be in 1NF
- Remove partial dependencies
- All non-key attributes must depend on the entire primary key

## Third Normal Form (3NF)
- Be in 2NF
- Remove transitive dependencies
- Non-key attributes must not depend on other non-key attributes

## Example
**Unnormalized Table:**
| Student_ID | Student_Name | Subjects          |
|------------|--------------|-------------------|
| 1          | John Doe     | Math, Science     |
| 2          | Jane Smith   | English, History  |

**1NF:**
| Student_ID | Student_Name | Subject  |
|------------|--------------|----------|
| 1          | John Doe     | Math     |
| 1          | John Doe     | Science  |
| 2          | Jane Smith   | English  |
| 2          | Jane Smith   | History  |
`,
            tags: ['Database', 'Normalization', 'SQL'],
            createdAt: '2024-11-08',
            updatedAt: '2024-11-15',
            author: 'Mentor David'
          },
          {
            id: 4,
            title: 'CSS Flexbox Guide',
            category: 'CSS',
            content: `# CSS Flexbox Complete Guide

## Flex Container Properties

### display: flex
\`\`\`css
.container {
  display: flex;
}
\`\`\`

### flex-direction
- **row** (default): left to right
- **row-reverse**: right to left
- **column**: top to bottom
- **column-reverse**: bottom to top

### justify-content
- **flex-start**: Items at start
- **flex-end**: Items at end
- **center**: Items centered
- **space-between**: Equal space between items
- **space-around**: Equal space around items

### align-items
- **stretch** (default): Items stretch to fill container
- **flex-start**: Items at start
- **flex-end**: Items at end
- **center**: Items centered
- **baseline**: Items aligned to baseline

## Flex Item Properties

### flex-grow
Specifies how much the item will grow relative to other items.

### flex-shrink
Specifies how much the item will shrink relative to other items.

### flex-basis
Sets the initial size of the flex item.

### flex (shorthand)
\`\`\`css
.item {
  flex: 1 1 200px; /* grow shrink basis */
}
\`\`\`
`,
            tags: ['CSS', 'Flexbox', 'Layout'],
            createdAt: '2024-11-12',
            updatedAt: '2024-11-19',
            author: 'Mentor Lisa'
          }
        ];

        setNotes(mockNotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const categories = ['All', ...new Set(notes.map(note => note.category))];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const NoteCard = ({ note }) => (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 cursor-pointer border-l-4 border-indigo-500"
      onClick={() => setSelectedNote(note)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition">{note.title}</h3>
        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
          {note.category}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {note.content.split('\n')[0].replace(/^#+\s*/, '')}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            #{tag}
          </span>
        ))}
        {note.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{note.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {note.author}</span>
        <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );

  const NoteViewer = ({ note, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{note.title}</h2>
            <p className="text-gray-600 mt-1">By {note.author} • {note.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-lg max-w-none">
            {/* Simple markdown-like rendering */}
            {note.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mb-4 mt-6">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mb-3 mt-5">{line.substring(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{line.substring(4)}</h3>;
              } else if (line.startsWith('```')) {
                return null; // Skip code block markers for simplicity
              } else if (line.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="mb-2">{line}</p>;
              }
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Notes & Resources</h1>
        <p className="text-gray-500">Access study materials, guides, and learning resources</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No notes found matching your criteria.</p>
        </div>
      )}

      {/* Note Viewer Modal */}
      {selectedNote && (
        <NoteViewer
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-2">{notes.length}</div>
          <p className="text-gray-600">Total Notes</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
          <p className="text-gray-600">Categories</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {notes.reduce((acc, note) => acc + note.tags.length, 0)}
          </div>
          <p className="text-gray-600">Total Tags</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {notes.filter(note => new Date(note.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
          </div>
          <p className="text-gray-600">Updated This Week</p>
        </div>
      </div>
    </div>
  );
};

export default StuNotesView;
