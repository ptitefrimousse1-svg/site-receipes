
    let ingredients = [];
        
        function toggleSommaire() {
            const panel = document.getElementById('sommairePanel');
            panel.classList.toggle('active');
}

    function scrollToSection(section) {
        if (section === 'home') {
            showHome();
            toggleSommaire();
            }
}

const recipesData = {
    'petit-dej': [
        { 
            id: 'pancakes',
            name: 'Pancakes',
            ingredients: ['eggs', 'flour', 'baking powder', 'milk'],
            link: 'pancakes.html'
        },
        { 
            id: 'Yogurt bowl',
            name: 'Yogurt bowl',
            ingredients: ['yogurt', 'fruits', 'granola', 'nut butter'],
            link:'yogurt.html'
        },
        { 
            id: 'Eggs and toast',
            name: 'Scramble eggs and banana toast',
            ingredients: ['banana', 'eggs', 'bread', 'haselnut butter', 'milk'],
            link: 'eggs.html'
        },
        { 
            id: 'Porridge',
            name: 'Porridge',
            ingredients: ['banana', 'oats', 'nut butter', 'sirop', 'milk','chocolate','nuts'],
            link: 'porridge.html'
        }
    ],

    'plats': [
        { 
            id: 'Gratin',
            name: 'Cauliflower gratin and salad',
            ingredients: ['cauliflower', 'peper', 'flour', 'milk','salad'],
            link: 'gratin.html'
        },
        { 
            id: 'Curry',
            name: 'Sweet potatoes curry',
            ingredients: ['sweet potatoes', 'coco milk', 'chickpeas', 'spinach', 'ognions','garlic','curry','ginger','oil'],
            link: 'curry.html'
        },
        { 
            id: 'Soup',
            name: 'Grilled cheese and soup',
            ingredients: ['pumpkin', 'potatoes', 'carrots', 'spices', 'bread','gratted cheese'],
            link: 'soup.html'
        },
        { 
            id: 'Summer salad',
            name: 'Summer salad',
            ingredients: ['lentils','cherries tomatoes', 'ognions','courgette','mozzarella','basil','parsley'],
            link: 'salad.html'
        }
    ],

    'desserts': [
        { 
            id: 'Banana bread',
            name: 'Banana bread',
            ingredients: ['banana', 'eggs', 'flour', 'baking powder', 'milk','oil','vanilla sugar'],
            link: 'banana-bread.html'
        },
        { 
            id: 'Blueberry muffins',
            name: 'Blueberry muffins',
            ingredients: ['banana', 'eggs', 'oat flour', 'baking powder', 'peanut butter'],
            link: 'muffins.html'
        },
        { 
            id: 'Vegan waffles',
            name: 'Vegan waffles',
            ingredients: ['eggs', 'flour', 'bakers yeast', 'vegetal milk','sugar','margarine','corn starch'],
            link: 'waffles.html'
        },
        { 
            id: 'Crumble',
            name: 'Red berries crumble',
            ingredients: ['red berries', 'butter', 'flour', 'sugar','oat','nuts'],
            link: 'crumble.html'
        }
    ],

    'snacks': [
        { 
            id: 'Energy balls',
            name: 'Energy balls',
            ingredients: ['almond powder', 'haselnut powder', 'oat flour', 'peanut butter', 'agave syrup','chocolate'],
            link: 'balls.html'
        },
        { 
            id: 'Houmous',
            name: 'Houmous plate',
            ingredients: ['chickpeas', 'garlic', 'sesame oil', 'olive oil', 'lemon juice'],
            link: 'houmous.html'
        },
        { 
            id: 'Snicker',
            name: 'Healthy snicker bars',
            ingredients: ['dattes', 'peanut butter', 'peanuts', 'chocolate', 'agave syrup','cashews'],
            link: 'snicker.html'
        },
        { 
            id: 'Smoothie',
            name: 'Smoothie bowl',
            ingredients: ['frozen redberries','banana', 'chocolate', 'granola','peanut butter', 'almond milk'],
            link: 'smoothie.html'
        }
    ]
};

    function addIngredient() {
        const input = document.getElementById('ingredientInput');
        const value = input.value.trim().toLowerCase();
        
        if (value && !ingredients.includes(value)) {
            ingredients.push(value);
            updateTags();
            input.value = '';
            }
}

    function removeIngredient(ing) {
    ingredients = ingredients.filter(item => item !== ing);
    updateTags();
}

    function updateTags() {
        const tags = document.getElementById('ingredientsTags');
        if (ingredients.length === 0) {
            tags.innerHTML = '';
            return;
        }
        tags.innerHTML = ingredients.map(ing => 
            `<div class="tag">
                ${ing}
                <span class="remove" onclick="removeIngredient('${ing}')">×</span>
            </div>`
        ).join('');
}

    function findRecipes() {
        if (ingredients.length === 0) {
            alert('Please add at least one ingredient!');
            return;
        }

        const allRecipes = Object.values(recipesData).flat();
        const matching = allRecipes.filter(recipe => 
            recipe.ingredients.some(ing => 
                ingredients.some(userIng => ing.includes(userIng) || userIng.includes(ing))
            )
        );

        if (matching.length === 0) {
            alert('No recipes found. Try other ingredients!');
            return;
        }

        displayRecipes('Recipes found with your ingredients', matching);
}

    function showCategory(category) {
        const titles = {
            'petit-dej': 'Breakfast',
            'plats': 'Meals',
            'desserts': 'Desserts',
            'snacks': 'Snacks',
        };
        displayRecipes(titles[category], recipesData[category]);
}

function displayRecipes(title, recipes) {
    document.getElementById('recipesTitle').textContent = title;
    const grid = document.getElementById('recipesGrid');
    
    grid.innerHTML = recipes.map(recipe => 
        `<a href="${recipe.link}" style="text-decoration: none; color: inherit;">
            <div class="recipe-card">
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-ingredients">
                    <strong>Ingredients:</strong><br>
                    ${recipe.ingredients.join(', ')}
                </div>
                <div style="margin-top: 15px; padding: 10px 20px; background: #7a2828; color: white; border-radius: 25px; text-align: center; font-weight: 600;">
                    View Full Recipe →
                </div>
            </div>
        </a>`
    ).join('');

    document.getElementById('homePage').style.display = 'none';
    document.getElementById('recipesPage').style.display = 'block';
    window.scrollTo(0, 0);
}

    function showHome() {
        document.getElementById('homePage').style.display = 'flex';
        document.getElementById('recipesPage').style.display = 'none';
        window.scrollTo(0, 0);
    };

    document.getElementById('ingredientInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addIngredient();
        }

    });
