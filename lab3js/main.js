/**
 * @class Item
 * Класс, представляющий обычный предмет инвентаря.
 */
class Item {
  /**
   * @constructor
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary).
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string}
   */
  getInfo() {
    return `Название: ${this.name}, Вес: ${this.weight} кг, Редкость: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight - Новый вес предмета.
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * @class Weapon
 * Класс, представляющий оружие, расширяет Item.
 */
class Weapon extends Item {
  /**
   * @constructor
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {string} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия (0–100).
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие, уменьшая его прочность на 10, если оно ещё не сломано.
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    } else {
      console.log(`${this.name} сломано и не может быть использовано.`);
    }
  }

  /**
   * Восстанавливает прочность оружия до 100.
   */
  repair() {
    this.durability = 100;
  }

  /**
   * Возвращает строку с информацией об оружии.
   * @override
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Урон: ${this.damage}, Прочность: ${this.durability}`;
  }
}

// === Тестирование ===

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`Прочность после использования: ${bow.durability}`);
bow.repair();
console.log(`Прочность после починки: ${bow.durability}`);

// Дополнительные примеры
const axe = new Weapon("Battle Axe", 5.0, "legendary", 30, 50);
console.log(axe.getInfo());
axe.use();
axe.use();
axe.use();
console.log(axe.getInfo());

const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());
